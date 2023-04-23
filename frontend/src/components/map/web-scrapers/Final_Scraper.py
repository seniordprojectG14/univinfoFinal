import Undergrad_WS as ugs
import Grad_WS as gs
import Dining_Hall_V2 as ds
import json
def merge(x,y):
    final = x
    for key in y:
        if key in final:
            for item in y[key]:
                final[key].append(item)
        else:
            final[key] = y[key]
    return final

def run():
    semester = 'Spring 2023'
    input('Please enter a semester')
    undergrad = ugs.final_product(semester)
    graduate = gs.final_product(semester)
    final_roster = merge(graduate, undergrad)
    json_object = json.dumps(final_roster, indent = 4)
    with open('All_classes.json', "w") as outfile:
        outfile.write(json_object)
    ds.final_product()


if __name__ == '__main__':
    run()
    





