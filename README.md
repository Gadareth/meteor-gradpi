# meteor-gradpi
Individual Project 2: Graduate advisor rating website

Grad PI Workflow & Pseudo-Code

Workflow
A new user comes to the site, sees the about page, registers, and signs in. 
The user is taken to the list of PIs and clicks on one to rate. 
If the PI is not there, the user can click on the “add a PI” page, and put in the details for a PI. 
Either way, the user is then taken to the rating page, which has the PI’s info and pic at the top of it. 
The user rates the PI and submits the rating. 
The user is then taken to a thank-you page and sees all the ratings for that PI.

Pseudo-Code
Add a PI
1.	Take in the PI’s name, school, dept, and picture
2.	Let the user submit the variables
3.	Take the user to the rating page to rate the PI

Find a PI
1.	Display all the unique entries of PIs with their name, department, school, 

Rate a PI
1.	Let the user input ratings for Stature, Mentorship, Autonomy, Resources, & Tact.
2.	Accept additional comments from the user.
3.	Let the user submit the ratings and comments.
4.	Take the user to a profile page for the PI, which shows all the ratings for that PI

PI Profile
1.	Averages all the ratings for a given PI category
2.	Displays the average rating for each category and overall in number and star form

Additional Features
•	Anonymous reporting
•	Responses from PIs
•	Filter function by school and dept

