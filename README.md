#### features  
[For user side - easy]  
- get data from firebase -> render cards  
- create Modal from enlarged image with click.
  
[For admin side - handling single file is easy, but multiple one was tricky]
- able to upload multiple files  
- able to delete multiple files  
- able to update file orders  
- able to change multipe file orders with drag  
All function should reflect to the page immediately.  
Need one state? ref? to handle all and update at one parent component.  

overView should be the parents.

### Learning outcome  
1. I was not using react state properly... Why did I think I have to get data everytime?  
I just had to update state and make sure firebase is updated. => reduced code.  
2. It's my firs time using any kind of authentification system. Learning some security problems such as  
session , local storage (Cross-Site-Scripting attack), cookies (but not very secure).  
