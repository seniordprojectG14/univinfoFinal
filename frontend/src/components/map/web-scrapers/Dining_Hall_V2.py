from bs4 import BeautifulSoup
import requests
import json

def get_webpage(url):
    #Returns a list of the form [List of meal names, today's date, lists of meal contents]
    date = url.split('=')
    date = date[-1].split('%2f')
    date = ('{}/{}/{}').format(date[0],date[1],date[2])
    print(date)
    req = requests.get(url)
    if req.status_code == 200:
        soup = BeautifulSoup(req.content, 'html.parser')
    else:
        print('error')
    #lst = soup.find_all(style="color: #000000")
    meal_names = soup.find_all(attrs={"class" : "shortmenumeals"})
    for i in range(len(meal_names)):
        meal_names[i] = meal_names[i].text
    lst = soup.find_all(attrs = {'valign':'top','width':['30%','50%','100%']})
    meals = [meal_names, date]
    for section in lst:
        print(len(lst))
        options = []
        lines = section.find_all(style="color: #000000")
        for line in lines:
            text = line.string
            #print(text)
            if text != '\xa0' and text != None:
                if text[0] != '-':
                    options.append(text.strip('\xa0'))
        meals.append(options)
    return meals

def get_halls():
    url = 'https://dining.uconn.edu/nutrition/'
    req = requests.get(url)
    if req.status_code == 200:
        soup = BeautifulSoup(req.content, 'html.parser')
    else:
        print('error')
    table = soup.find_all("a",rel='noopener')
    lst = []
    for item in table:
        lst.append(item['href'])
    if lst[1] == lst[2]:
        lst.remove(lst[1])
    return lst[:8]

def get_dates(url):
    start = 'http://nutritionanalysis.dds.uconn.edu/'
    req = requests.get(url)
    if req.status_code == 200:
        soup = BeautifulSoup(req.content, 'html.parser')
    else:
        print('error')
    table = soup.find_all('a')
    lst = []
    for item in table:
        end = item['href']
        if len(end) > 25:
            lst.append(start + end)
    return_lst = []
    for item in lst:
        if item[-4:] == '2023':
            return_lst.append(item)
    return return_lst

def full_program():
    diners = ['Buckley','Gelf','McMahon','North','Northwest','Putnam','South','Whitney']
    menu = dict()
    for item in diners:
        menu[item] = []
    halls = get_halls()
    i = 0
    for hall in halls:
        print(hall)
        dates = get_dates(hall)
        for date in dates:
            print('data')
            menu[diners[i]].append(get_webpage(date))
        i +=1 
    outfile = open('Dining_Halls.txt','w')
    for key in menu:
        outfile.write('----------NEW-HALL----------\n')
        outfile.write(key + '\n')
        for day in menu[key]:
            outfile.write('----------NEW-DAY----------\n')
            outfile.write(day[1] + '\n')
            meal_index = 2
            for mealname in day[0]:
                outfile.write('----------NEW-MEAL----------\n')
                outfile.write('{}\n'.format(mealname))
                for line in day[meal_index]:
                    outfile.write(line + '\n')
                meal_index += 1
    outfile.close()
    return menu

def newdict(d):
	new = dict()
	for key in d:
		new[key] = dict()
		for i in range(len(d[key])):
			date = d[key][i][1]
			t = ''.join(date.split('/'))
			date = 'd' + t
			new[key][date] = dict()
			meals = d[key][i][0]
			j = 0
			for meal in meals:
				new_string = ''
				for food in d[key][i][j+2]:
					new_string += '{}\n'.format(food)
				new[key][date][meal] = new_string
				j += 1

	return new
    
def final_product():
    h = full_program()
    # Serializing json
    json_object = json.dumps(newdict(h), indent=4)
 
    # Writing to sample.json
    with open("Diner_menus.json", "w") as outfile:
        outfile.write(json_object)


if __name__ == '__main__':
    h = full_program()
    # Serializing json
    json_object = json.dumps(newdict(h), indent=4)
 
    # Writing to sample.json
    with open("Diner_menus.json", "w") as outfile:
        outfile.write(json_object)



