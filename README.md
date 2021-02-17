# Gallery-app  
Upload file, then you can have your own masonary layout gallery.  
Built with firebase, react, scss, webpack, babel.

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
3. Align images while keeping ratio. Flex or grid?  
Oh... it is actually hard! There are many different ways to achieve this.  
Note: firefox has grid-template-rows: masonry; feature!  
4. (Came back after 3 weeks) Drag and drop works on desktop but not in mobile! I wanted make without any library. Now I understand why ppl use a library for dnd...  
5. OMG. No CSS structure. what did I even write!?. Learn BEM, SMACSS, OOCSS and use it!
6. Lazy loading images. I should provide width and height with loading='lazy' attribute in `<img>`tag to prevent layout shift. But I didn't because all contents are images. Also, inital viewport images should not be lazy load.
