Hosted Link: https://cse134bhw5-572b2.web.app/
part1: https://cse134bhw5-572b2.web.app/methodtest.html
part3: https://cse134bhw5-572b2.web.app/styledcrud.html

Approach to Part 3: 
In my setup, all users can view the blog posts, but only authenticated users can modify the blog database.
When an email/password is input, firebase checks to see if the credentials exist in its authentication record, and if it passes,
the user enters as an admin. Entering as an admin modifies CSS styling and displays previously hidden buttons and inputs. While this approach does allow mischievious users to modify the css, each of the hidden buttons validates with firebase that there is indeed an authenticated user signed in, so mischievious users would not be able to utilize any admin functionality.

On Startup of the page, a function is run that extracts the documents in a firestore collection and then populates a table with the documents it extracts. This allows the blog collection to be up to date upon page loading, with the downside that users must refresh the page if they want to see changes made by other users that they did not do directly. This approach was done primarily to prevent constant calls to the firestore database, which could cause performance issues.

Blog posts are represented in an html table. While this isn't the most conventional way of displaying blog posts, the table structure is useful for ease of updating, and adding on to. When an admin wants to add a new blog post, a new row is added to the table, with 4 traits related to the blog: A title, an author, last updated date, and a content section. The title and content are input by the user, while date and author are automated using javascript. While this implementation sets the date on the front end, a more realistic implementation would set the date of each blog post server-side instead. As posts are added to the table they are also added to a firestore collection, with an additional trait that stores the auto-id that firestore gives to each blog post. This auto-id is used later to allow admins to reference existing blogs in the database so that they can be edited.

When an admin wants to edit a blog post, a dialog opens that is filled out with the values of the selected row. Changes that are made are updated on the table directly. In addition, an array stores the id values with each array index coressponding to a row in the table. The script references this array to tell firestore which id to update the contents in.

Deleting a blog post is done in a similar fashion. The script selects the id of the entry based on the row of the entry and then tells firestore to remove that id from its collection.

Login and Sign Out is persistent through refreshes. This is possible by making API calls to the firebase to see if a user is logged in or not on the page, and then loading the page accordingly.
