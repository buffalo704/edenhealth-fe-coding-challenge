### Questions

* How long did you spend on this code test? What would you improve if you had more time?
7.5 hours.  I had a few environment setup issues.  

1. For the api calls I would've added some memoize ability so that if the data was there, it wouldn't have to refetch data.
2. Build a library of reusable components. Card, Nav, Tab could have been its own components which gets reused by both Appointments and PatientsList.
3. Column sorting in tables.  The ability to sort asc or desc per column based on column header clicked.  
4. (not a requirement) more details under the patients list.  There's more user actions information to display besides message count.
5. DateTime - Date and Time could possibly be displayed as 2 separate columns
6. Use Flow. This can be used to provide another layer of stringent type checking by making sure you have the right types.
 
* We realize that that it may be difficult to implement an ideal solution for the presented problem given time constraints. Where did you cut corners and how did you decide what to leave out?

I decided to cut corners by using Bootstrap as a UI framework. I used a <UnControlledCollpapse> which basically allowed me to do an accordion style open/close without maintaining state.  

1. Given more time I could have looked into the <Collapse> accordian which maintains state for each card opened.  Knowing the state I could've managed whether I made an API call if the state for the card was open or nothing if the card was closed.
2. Add integration testing to simulate the different parts of the site working together.  I left this out for sake of time because I felt at least the unit test covered the basics of each component.

With a time constraint, I think what was most important was meeting the acceptance criteria for the user stories.  As long as the criterias was met, the other tasks can be seen as a nice to have and be worked on in a later time period.       

* We realize the API provided has some limitations that may not have been ideal. How would you change or improve the API if you could?
Usually API's would do the heavy lifting so that the FE can be dumb and just display the data. 
1. Breaking names into 2 columns First Name, Last Name.  Current sort on names is by the full string but traditionally people view sorted names by Last Name.
2. API's should return names of patients, not just patient_id. This would be useful for the appointments API call.
3. API's should be able to join patients with their user actions. More work done by API, less done by client.
4. API's should return counts per user actions. This could be included in the existing user actions API. 
5. Introduce pagination to results.       
6. Go with GraphQL so that developer can have flexibility of data fetching and can even fetch data from the JSON mock server.
* Was React a good framework for building this application? Why or why not? If not, what would you prefer instead and why?

React worked well.  It's a well supported framework that has a lot supported libraries.  It's easy to find 3rd party libraries to work well with the framework - Redux, Enzyme, Jest, etc.  Documentation is abundant.
     

* How enjoyable was this challenge? Do you have any feedback?
This challenge was fun. I think it allowed me to showcase more of my abilities than a normal tech screen would.    

I like how you had the counter example to basically prove that redux was working correctly.  Maybe adding a jest test example would be great too to prove that the testing environment was working well too.