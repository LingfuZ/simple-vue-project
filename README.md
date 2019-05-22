# simple-vue-project
A single page web app to load 10 images of a user-specified breed from theCatAPI.com.
Then let user specify a “slot” size of width and height in pixels, e.g. 300x200.
Rank the 10 images by how well each image can fit into the slot, determined by the two rules below:
* Aspect ratio: the closer an image’s aspect ratio is to the slot size, the better.
E.g, if the slot size is 200x200, a 500x400 image is better than a 600x400 image.
* Image size: if two images have the same aspect ratio,
the closer an image’s size is to the slot size, the better.
E.g., if the slot size is 200x200, a 400x400 image is better than a 600x600 image.

Display all images in the ranked order, preferably in the size of the slot with white space padding.