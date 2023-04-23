from bs4 import BeautifulSoup
import requests
import time
import json

class Class():
    def __init__(self, prefix = 'N.A', course_number = 'N.A', term_code = 'N/A', class_number = 'N/A',
                 session_code = 'N/A', section = 'N/A', term = 'N/A', campus = 'N/A', instruction_mode = 'N/A',
                 instructor = 'N/A', session = 'N/A', days = 'N/A', start_time = 'N/A', end_time = 'N/A', building = 'N/A', room = 'N/A',
                 capacity = 'N/A', enrolled = 'N/A', notes = 'N/A', Credits = 'N/A', grading_basis = 'N/A' ):
        self.prefix = prefix
        self.course_number = course_number
        self.term_code = term_code
        self.class_number = class_number
        self.session_code = session_code
        self.term = term
        self.campus = campus
        self.instructor = instructor
        self.instruction_mode = instruction_mode
        self.section = section
        self.session = session
        self.days = days
        self.start_time = start_time
        self.end_time = end_time
        self.building = building
        self.room = room
        self.capacity = capacity
        self.enrolled = enrolled
        self.notes = notes
        self.credits = Credits
        self.grading_basis = grading_basis
    

    def __str__(self):
        return '{} meets {} at {} in {}. The current enrollment is {}/{}.'.format((self.prefix + str(self.course_number)), self.days,
                                                                                  (self.start_time + '-' + self.end_time), (self.building + ' ' + self.room), self.capacity, self.enrolled)

    def __repr__(self):
        return(self.__str__())

    def show_all(self):
        print('self.prefix = {}'.format(self.prefix))
        print('self.course_number = {}'.format(self.course_number))
        print('self.term_code = {}'.format(self.term_code))
        print('self.class_number = {}'.format(self.class_number))
        print('self.session_code = {}'.format(self.session_code))
        print('self.section = {}'.format(self.section))
        print('self.term = {}'.format(self.term))
        print('self.campus = {}'.format(self.campus))
        print('self.instruction_mode = {}'.format(self.instruction_mode))
        print('self.instructor = {}'.format(self.instructor))
        print('self.session = {}'.format(self.session))
        print('self.days = {}'.format(self.days))
        print('self.start_time = {}'.format(self.start_time))
        print('self.end_time = {}'.format(self.end_time))
        print('self.building = {}'.format(self.building))
        print('self.room = {}'.format(self.room))
        print('self.capacity = {}'.format(self.capacity))
        print('self.enrolled = {}'.format(self.enrolled))
        print('self.notes = {}'.format(self.notes))
        
                                                                                  
        
class notaclass_error(Exception):
    pass

def Get_Course_info(url):
    prefix, number = url.split('/')[-2], url.split('/')[-1]
    print(prefix)
    print(number)
    classes = []
    req = requests.get(url)
    if req.status_code == 200:
        soup = BeautifulSoup(req.content, 'html.parser')
    else:
        print('error')
    #table = soup.select('#post-1392 > div > div.single-course > div.table-responsive > table > tbody')
    table = soup.select('tbody')
    if table == []:
        print('No clases found for {}{}'.format(prefix, number))
        raise notaclass_error
    #print(len(table))
    lst = table[0].select('tr')
    for item in lst:
        info = item.select('td')
        #return info
        prelim = info[0].select('span')
        teachers = info[4].get_text('*$*').replace('\xa0','').split('*$*')
        if teachers[0] == '':
            teachers = ['None Specified']
        string = ''
        for item in teachers:
            string += (item + '$')
        teachers = string
        #print(teachers)
        teachers = teachers.strip('$')
        capacity = info[9].text.split('/')
        if capacity == ['']:
            capacity = ['None Listed', 'None Listed']
        timing = info[7]
        if len(timing.select('br')) > 1:
            timing[0] = 'Check notes for details'
            start_time = timing[0]
            end_time = start_time
        else:
            timing = timing.text.split(' ')
            if timing == ['']:
                timing = ['None Listed', 'None Listed']
            elif len(timing) == 1:
                if ':' in timing[0]:
                    timing.append(timing[0])
                    timing[0] = 'None Specified'
            #Timing[0] is the days the class meets. Timing[1] is the time the class meets.
            start_time = 'None Listed'
            end_time = 'None Listed'
            if timing[1] != 'None Listed':
                #print(timing)
                times_split = timing[1].split('‑')
                #print(times_split)
                start_time = times_split[0]
                end_time = times_split[1]
        place = info[8].text.split(' ')
        if place == ['']:
            place = ['None Listed', 'None Listed']
        elif len(place) == 1:
            place.append(place[0])
        c = soup.find_all(attrs ={'class':'credits'})
        c = c[0].text.split(' ')
        for item in c:
            if '.' in item:
                Credits = item
                break
        G = soup.find_all(attrs ={'class':'grading-basis'})
        Grading_Basis = G[0].text.split(' ')[2]
        new_class = Class(prefix, number, prelim[0].string, prelim[1].string, prelim[2].string,
                          prelim[3].string, info[1].string, info[2].string,
                          info[3].string, teachers, info[6].string,
                          timing[0], start_time,end_time, place[0], place[1], capacity[1],
                          capacity[0], info[10].string,Credits,Grading_Basis)
        classes.append(new_class)
        #print(new_class.show_all())
    return classes
    
        
            

#lst = Get_Course_info('https://catalog.uconn.edu/directory-of-courses/course/PATH/1202')

def info(header, number):
    return Get_Course_info('https://catalog.uconn.edu/directory-of-courses/course/{}/{}'.format(header, number))

def get_URLS():
    url = 'https://catalog.uconn.edu/directory-of-courses/'
    req = requests.get(url)
    if req.status_code == 200:
        soup = BeautifulSoup(req.text, "html.parser")
        found_urls = []
        h = soup.find(attrs = {'class':'entry-content'})
        lst = h.select('li')
        lst = lst[26:]
        for i in range(len(lst)):
            #print(i)
            lst[i] = str(lst[i]).split('\"')[1]
            #print(lst[i])
    return lst


def get_course_pages(url):
    req = requests.get(url)
    if req.status_code == 200:
        soup = BeautifulSoup(req.text, "html.parser")
        h = soup.find(attrs = {'class':'single-course single-subject'})
        h = h.find_all(attrs = {'class':'btn btn-default'})
        for i in range(len(h)):
            h[i] = h[i]['href']
        return h
        



#lst = get_course_pages('https://catalog.uconn.edu/directory-of-courses/course/WGSS')

def full_program():
    class_dictionary = dict()    
    lst = get_URLS()
    for url in lst:
        prefix = url.split('/')[-1]
        class_dictionary[prefix] = []
    to_visit = []
    for url in lst:
        print(url)
        to_visit += get_course_pages(url)
    while len(to_visit) > 0:
        not_visited = []
        for url in to_visit:
            prefix = url.split('/')[-2]
            try:
                avaliable = Get_Course_info(url)
                class_dictionary[prefix] += avaliable
            except notaclass_error:
                pass
            except TimeoutError:
                print('timeout occured, check back later')
                not_visited.append(url)
            except:
                print('Error scraping')
        to_visit = not_visited[:]
    return class_dictionary
    
        


#lst = Get_Course_info('https://catalog.uconn.edu/directory-of-courses/course/ACCT/3221')

def convert_time(string):
    if string == 'None Listed' or string == 'Check notes for details':
            return 000
    parts = string.split(':')
    try:
        if parts[1][-2] == 'p' and parts[0] != '12':
            #Covers all PM except for the noon times
            parts[0] = int(parts[0]) + 12
            parts[1] = int(parts[1][:-2])
        elif parts[1][-2] == 'a' and parts[0] == '12':
            #Covers the midnight times
            parts[0] = 0
            parts[1] = int(parts[1][:-2])
        else:
            #Covers all Am except midnight times; also covers Noon Pm.
            parts[0] = int(parts[0])
            parts[1] = int(parts[1][:-2])
        return (parts[0] * 60) + parts[1]
    except:
        print(parts)
        return 000
    
def split_at_days(string):
    days = []
    possible_days = ['Su','Mo','Tu','We','Th','Fr','Sa']
    for i in range(6):
        if possible_days[i] in string:
            days.append(i)
    return days

def final_product(current_semester):
    if current_semester not in ['Fall 2022', 'Spring 2023']:
        print('Semester not valid, try again')
        return
    dictionary = full_program()
    final_new = dict()
    for key in dictionary:
        for item in dictionary[key]:
            if item.campus == 'Storrs' and item.term == current_semester:
                if item.building != 'Class'and item.building != 'No' and item.building != 'Class':
                    temp = {'room': item.room, 'major':item.prefix, 'number': item.course_number,
                            'start':convert_time(item.start_time), 'end':convert_time(item.end_time),
                            'teachers': item.instructor.split('$'), 'days': split_at_days(item.days)}
                    if item.building in final_new:
                        final_new[item.building].append(temp)
                    else:
                        final_new[item.building] = [temp]
    return final_new

                                  
if __name__ == '__main__':        
    print("Begin")
    start = time.time()
    dictionary = full_program()
    scraped = time.time()



    outfile = open('Classes.txt', 'w')
    outfile.write('Prefix::Course_Number::Term_Code::Class_Number::Session_Code::Term::Campus::Instructor::Instruction_mode::Section::Session::Days::StartTime::EndTime::Building::Room::Capacity::Enrolled::Notes::Credits::GradingBasis\n')
    for key in dictionary:
        for item in dictionary[key]:
            outfile.write('{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}::{}\n'.format(item.prefix, item.course_number, item.term_code, item.class_number,
                                                                                         item.session_code, item.term, item.campus, item.instructor,
                                                                                         item.instruction_mode, item.section, item.session, item.days,
                                                                                         item.start_time, item.end_time, item.building, item.room, item.capacity,
                                                                                         item.enrolled, item.notes,item.credits,item.grading_basis))
    outfile.close()
    written = time.time()
    print('Took {} seconds to scrape, and {} seconds to write. Total time {} seconds'.format(scraped - start, written - scraped, written - start))



    final_new = dict()
    for key in dictionary:
            for item in dictionary[key]:
                    if item.campus == 'Storrs':
                            if item.building != 'Class'and item.building != 'No' and item.building != 'Class':
                                    if item.building in final_new:
                                            final_new[item.building].append({'room': item.room, 'major':item.prefix, 'number': item.course_number,
                                                                  'start':convert_time(item.start_time), 'end':convert_time(item.end_time),
                                                                             'teachers': item.instructor.split('$'), 'days': split_at_days(item.days)})
                                    else:
                                            final_new[item.building] = [{'room': item.room, 'major':item.prefix, 'number': item.course_number,
                                                                  'start':convert_time(item.start_time), 'end':convert_time(item.end_time),
                                                                         'teachers': item.instructor.split('$'), 'days': split_at_days(item.days)}]
    json_object = json.dumps(final_new, indent = 4)
    with open('Undergrad_classes.json', "w") as outfile:
            outfile.write(json_object)

        

