import React, { useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import { useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import PushPinIcon from '@mui/icons-material/PushPin';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SchoolIcon from '@mui/icons-material/School';
import halls from './Diner_menus.json';
import times from './Diner_hours.json';
import classrooms from './Class_locs.json';
import grad_cat from './All_classes.json';

console.log('Content Bod!');

function get_menu(hall) {
    //Function returns a code to be passes to diner_coords to pull up the proper menu
    var currentdate = new Date();
    var year = currentdate.getFullYear();
    var hour = currentdate.getHours();
    var minutes = currentdate.getMinutes();
    var timestamp = (60 * hour) + minutes;
    var month = currentdate.getMonth() + 1;
    var num_day = currentdate.getDate();
    var weekday = currentdate.getDay();
    var id = 'd' + month + num_day + year;
    // 7 and 0 are weekends
    console.log(weekday);
    if (weekday == 6 || weekday == 0) {
        var B_times = times.Weekends.Breakfast[hall];
        var L_times = times.Weekends.Lunch[hall];
        var D_times = times.Weekends.Dinner[hall];
    }
    else {
        var B_times = times.Weekdays.Breakfast[hall];
        var L_times = times.Weekdays.Lunch[hall];
        var D_times = times.Weekdays.Dinner[hall];
    }
    var possible_meals = [[B_times, 'Breakfast'],[B_times, 'Breakfast'],[B_times, 'Breakfast']];
    //var possible_meals = [[B_times, 'Breakfast'], [L_times, 'Lunch'], [D_times, 'Dinner']];
    // possible_meals[i][0] = a pair of form [opening, closing]
    var confirmed_meals = []
    for (let i = 0; i < 3; i++) {
        if (possible_meals[i][0] != null) {
            confirmed_meals.push(possible_meals[i]);
        }
    }
    if (confirmed_meals.length == 0) {
        var open = 9999
        var close = 0
    }
    else {
        var open = confirmed_meals[0][0][0]
        var close = confirmed_meals[confirmed_meals.length - 1][0][1]
    }

    var meal = 'Snack Time!';
    if (timestamp < open || timestamp > close) {
        meal = 'Hall Closed';
    }
    else {
        for (let i = 0; i < confirmed_meals.length; i++) {
            if (timestamp > confirmed_meals[i][0][0] & timestamp < confirmed_meals[i][0][1]) {
                meal = confirmed_meals[i][1];
            }
        }
    }
        console.log(id);
        console.log(timestamp);
        console.log(hall);
        if (meal == 'Hall Closed') {
            var menu = 'Hall Closed';
        }
        else if (meal == 'Snack Time!') {
            var menu = 'Assorted Snacks';
        }
        else {
            var menu = halls[hall][id][meal];
        }
    
        console.log(menu);
        return menu
    }

console.log('Not here!');
get_menu('South');
get_menu('Buckley');
console.log('Here!');

const GoogleMaps = ({ currentId, setCurrentId }) => {
    const posts = useSelector((state) => state.posts);

    const AnyReactComponent = props => {

        return (
            <Tooltip title="custom post for campus info (hard coded) ">
                <PushPinIcon />
            </Tooltip>);
    }


    const Gym = props => {
        let capacity = '39'
        return (

            <Tooltip title={capacity}>
                <FitnessCenterIcon />
            </Tooltip>);
    }

    const Dining_Hall = props => {
        let name = 'Lets ball'
        return (
            <a href="https://www.nick.com/">
                <Tooltip title={name}>
                    <RestaurantIcon>
                    </RestaurantIcon>
                </Tooltip>
            </a>);
    }
    const markerClick = () => {
        console.log("clicked");
    }

    const renderMarkers = (map, maps) => {
        {
            posts?.map((post) => {
                Geocode.setLanguage("en");
                Geocode.setApiKey("AIzaSyBBoDTa2K0ql0d3ssnlMEYXdBvQLI6_LqA");
                Geocode.fromAddress(post.address).then(
                    (response) => {
                        const { lat, lng } = response.results[0].geometry.location;
                        const Marker = new maps.Marker({
                            position: { lat: lat, lng: lng },
                            map,
                            title: 'Hello World!'
                        });
                        return Marker;
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            })
        }
    }

    const renderMyMarkers = (map, maps) => {
        {
            posts?.map((post) => {
                Geocode.setLanguage("en");
                Geocode.setApiKey("AIzaSyBBoDTa2K0ql0d3ssnlMEYXdBvQLI6_LqA");
                Geocode.fromAddress(post.address).then(
                    (response) => {
                        const { lat, lng } = response.results[0].geometry.location;
                        const Marker = new maps.Marker({
                            position: { lat: lat, lng: lng },
                            map,
                            title: 'Hello World!',

                        });
                        return Marker;
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            })
        }
    }

 


    var diner_coords = [{ name: 'Buckley', X: 41.8056555870853, Y: - 72.24388459682399, menu: get_menu('Buckley') },
        { name: 'Gelf', X: 41.814160246170076, Y: - 72.25398514100021, menu: get_menu('Gelf') },
        { name: 'McMahon', X: 41.80368003438827, Y: - 72.25189957352976, menu: get_menu('McMahon')},
        { name: 'North', X: 41.80368003438827, Y: - 72.25189957352976, menu: get_menu('North') },
        { name: 'Northwest', X: 41.8116748819886, Y: - 72.25975373120009, menu: get_menu('Northwest') },
        { name: 'Putnam', X: 41.805361935522505, Y: - 72.2589664735297, menu: get_menu('Putnam') },
        { name: 'South', X: 41.80420994357475, Y: - 72.24876338479156, menu: get_menu('South') },
        { name: 'Whitney', X: 41.810095215886975, Y: - 72.24721843428927, menu: get_menu('Whitney')}  ]

    function get_display(Building) {
        console.log(Building);
        console.log(grad_cat[Building]);
        var classes = grad_cat[Building];
        if (classes == undefined) { return 'School\'s out!;'}
        var considering = []
        var currentdate = new Date();
        var year = currentdate.getFullYear();
        var hour = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var timestamp = (60 * hour) + minutes;
        var weekday = currentdate.getDay();
        for (let i = 0; i < classes.length; i++) {
            current = classes[i];
            if (current.days.includes(weekday) & timestamp > current.start & timestamp < current.end) {
                var message = Building + ' ' + current.room + ' \n' + current.major + ' ' + current.number + ' \n';
                for (let j = 0; j < current.teachers.length; j++) {
                    message = message + current.teachers[j] + ' ';
                }
                considering.push(message);
            }

        }
        var final_output = '';
        for (let i = 0; i < Math.min(considering.length, 5); i++){
            final_output = final_output + considering[i] + '\n---------------\n';
        }
        if (final_output == '') {
            final_output = 'School\'s out!'
        }
        return final_output;
    }
    console.log(get_display("BUSN"));

        var catalouge_buildings = Object.keys(grad_cat);
        var catalouge_dictionary = {};
        for (let i = 0; i < catalouge_buildings.length; i++) {
            var current = catalouge_buildings[i];
            catalouge_dictionary[current] = [];
        }
        for (let i = 0; i < catalouge_buildings.length; i++) {
            var current = catalouge_buildings[i];
            var j_current = grad_cat[current];
            for (let j = 0; j < grad_cat[current].length; j++) {
                var current_object = j_current[j]
                var temp_string = current + ' ' + current_object.room + ' \n' + current_object.major + ' ' + current_object.number + ' \n';
                for (let q = 0; q < current_object.teachers.length; q++) {
                    temp_string = temp_string + current_object.teachers[q] + ',';
                }
                catalouge_dictionary[current].push([temp_string, current_object.start, current_object.end]);
            }
        }
        console.log(catalouge_dictionary);
    var classroom_coords = []
    var buildings = Object.keys(classrooms);
    for (let i = 0; i < buildings.length; i++) {
        var current = buildings[i];
        //console.log(classrooms[current].X);
        classroom_coords.push({ name: current, X: classrooms[current].X, Y: classrooms[current].Y, message: get_display(current)});
    }
    console.log('Zoom Test');

 return (
   <div style={{ height: '80vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyBBoDTa2K0ql0d3ssnlMEYXdBvQLI6_LqA' }}
      defaultCenter={{ lat: 41.80593409999999, lng: -72.25367539999999 }}
      defaultZoom={16}
      yesIWantToUseGoogleMapApiInternals
             onGoogleApiLoaded={({ map, maps }) => renderMyMarkers(map, maps)}
             onZoomChanged={() => {
                 console.log(this.getZoom())
             }}
      
    >
      {/* <Marker lat={43.80593409999999} lng={-74.25367539999999 }/> */}
      <AnyReactComponent  
         lat={41.80593409999999} lng={-72.25367539999999 }/>
      <Gym
                 lat={41.805020} lng={-72.252560} />
             {diner_coords.map((item) => (
                 <a href="https://dining.uconn.edu/nutrition/" lat={item.X} lng={item.Y}>
                     <Tooltip title={
                         <React.Fragment>
                             <span style={{
                                 'white-space': "pre-line",

                             }}>{item.menu}</span>
                     </React.Fragment>}>
                         <RestaurantIcon sx={{
                             "&:hover": { color: "Red" },
                         }}>
                         </RestaurantIcon>
                     </Tooltip>
                 </a>)
             )}

             {classroom_coords.map((item) => (
                 <a href="https://catalog.uconn.edu/" lat={item.X} lng={item.Y}>
                     <Tooltip title={<React.Fragment>
                         <span style={{ 'white-space': "pre-line"}}>{item.message}</span>
                     </React.Fragment>}
                         resizeHide={false}>
                         <SchoolIcon style={{ fontSize: "20px" }} sx={{
                             "&:hover": { color: "Red" },
                         }}>
                         </SchoolIcon>
                     </Tooltip>
                 </a>)
             )}
            
       

    </GoogleMapReact>
   </div>
 );
};

export default GoogleMaps;
