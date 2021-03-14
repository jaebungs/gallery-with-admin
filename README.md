# Masonry Generator

## Introduction
Upload images. Then, there will be a Masonry gallery website!  
A friend who has a Shopify website wanted to have a photo gallery function to display some of her works.  

**Admin button is at the bottom right corner of the app.**  
**ID: test@test.com**  
**PW: testtest**  

## The goal
Create a clean UI masonry gallery that can be managed easily.

## Development process
1. Gather requirements.
2. Brainstorm design, build process, and other app features.
3. Choose tools.
4. Make, test and present.
5. Change based on the feedback. Back and forth a few times.
6. Check responsive.

## Problem encountered

| **Problems** | **Solution / Learning Outcome** |
| :- | :- |
|What tool to use storing images?|<p>Google drive came up in my head first, then Imgur and other storage websites. I could use those, however, it was not easy and user-friendly to save and retrieve images from free cloud services.</p><p>After long hours of research, trial and fail, I found Firebase!</p>|
|Masonry… but with what and how?|<p>Should I use Grid? Or Flex? Set specific height on nth pictures? But each image should keep its ratio.</p><p>I decided to use the grid for practice and display it in left to right order while keeping each image’s ratio.</p><p>It was not as easy as I was expecting.</p><p>Actually, I struggled and I think I made it too complicated, but this is the solution I came up with at that time.</p><p></p><p>One grid div that has a maximum 4 column (280px) with 1px of many rows.</p><p>Calculate image width and height during upload and give appropriate span. This way we can keep its ratio.</p><p></p><p></p>|
|Restrict admin page.|<p>Learned private routing.</p><p>It was an interesting concept. I would like to dive more into authentication and authorization. </p>|
|<p>Structuring data flow.</p><p>Should I have one collection contains image data and image orders? Or two separate collections?</p><p></p><p></p><p></p>|<p>This took quite a long time to structure and implement. I could not decide where and how to start.</p><p>The good thing was I did not have to make CRUD API, but setting up firebase and learning syntax took some time.</p><p></p><p>Instead of having an image order array in one document with image data, I made two separate collections because it was easy to manipulate and visualize. </p><p></p><p>Data flow.</p><p>- When uploading, add images to the Storage. Once images are saved in the Storage, get the URL and create an object that contains other metadata. Third, update image order.</p><p>- When deleting, instead of deleting by indexes in the Firestore, make state changes then upload the state.</p><p></p>|
|Let’s use a library next time. Drag and Drop function on mobile does not work.|<p>I wanted to build everything from scratch, so I used HTML drag and drop API. </p><p>It felt really good after many obstacles. However, I found that it does not work on mobile! There were many things to consider drag and drop functions to work in mobile.</p><p>Using lots of libraries is not good, but sometimes it is necessary.</p>|
|<p>Poor CSS structuring.</p><p>I got lost after I came back weeks later...</p>|<p>Learn BEM, SMACSS, OOCSS.</p><p>Read articles, but I need to practice more.</p>|
|Lazy loading.|<p>Rendering videos and images are heavy work. Painting multiple contents at once will increase blocking time which means bad site performance.</p><p>One solution is lazy loading.</p><p>Instead of loading everything at once, download sections or contents that only what the user needs.</p><p>Use loading=”lazy” with inline width and height.</p><p>After defining the width on the line, lazy loading started to work.</p>|

