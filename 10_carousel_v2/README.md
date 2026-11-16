# bxSlider Carousel

Modify how the bxSlider plugin is used in the original [Carousel application](https://github.com/fausto-gonzalez/javascript-coursework/tree/main/09_carousel). Configure a random starting image, single-image display, one-slide movement, three-second automatic transitions, and a numeric pager.

The assignment refers to the plugin options documented at [bxSlider](http://bxslider.com).

## Expected result

This screenshot shows the interface provided in the original assignment. The **About Us** section displays one facility image at a time, navigation arrows, a caption, and a pager in the form **2 / 5**.

![About Us carousel displaying one facility image with a Left side caption, navigation arrows, and a 2 / 5 pager.](assets/result.jpeg)

## Assignment steps

1. Review the code in the HTML file.
2. Modify the jQuery code that calls bxSlider so the first displayed image is selected randomly. Use the `randomStart` option.
3. Add an option to make the carousel move one slide at a time.
4. Modify the plugin configuration so only one image is displayed at a time.
5. Add an option to set the time between automatic transitions to three seconds.
6. Add options to display a pager in the format shown in the screenshot. Place this pager in the paragraph with ID `pager`, below the list of images.

## Required behavior

| Setting | Expected behavior |
| --- | --- |
| Starting image | Selected randomly |
| Slide movement | One slide per transition |
| Visible images | One image at a time |
| Automatic transition interval | 3 seconds |
| Pager format | Current slide / total slides, such as 2 / 5 |
| Pager location | Paragraph with ID `pager` below the image list |

## Manual checks

- Reload the page several times to check that different starting images can appear.
- Confirm that only one image is visible at a time.
- Use the navigation arrows and confirm that each transition moves one slide.
- Observe the automatic transitions and confirm the three-second interval.
- Confirm that the pager is below the carousel and updates to match the current slide.
