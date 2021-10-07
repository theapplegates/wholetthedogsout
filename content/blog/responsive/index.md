---
title: Responsive Images the hard way
date: "2021-08-30T23:35:44+00:00"
description: Responsive images the hard way
---
The image on this page was run [Cloudinary's Responsive Image Breakpoint Generator](https://www.responsivebreakpoints.com). It takes an image and generates various srcset values for an image. The example image on this page had 11MB of jpg images generated for various screen sizes. The browser will pick the correct image for the viewport size. The fun part is by adding `withAvif` to the `gatsby-remark-images` plugin all the images generated will be delivered as `avif`, 	`webp`, or `jpg` images.
So it's kinda a long way in just letting cloudinary serving the image automatically using `f_auto`.

<picture>
<source
media="(max-width: 767px)"
sizes="(max-width: 1534px) 100vw, 1534px"
srcset="
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_200.jpg 200w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_557.jpg 557w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_810.jpg 810w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_946.jpg 946w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_1067.jpg 1067w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_1132.jpg 1132w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_1201.jpg 1201w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_1262.jpg 1262w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_1363.jpg 1363w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_1462.jpg 1462w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_1532.jpg 1532w,
park_cxoj4k_ar_1_1,c_fill,g_auto__c_scale,w_1534.jpg 1534w">
<source
media="(min-width: 768px) and (max-width: 991px)"
sizes="(max-width: 1983px) 70vw, 1388px"
srcset="
park_cxoj4k_ar_4_3,c_fill,g_auto__c_scale,w_538.jpg 538w,
park_cxoj4k_ar_4_3,c_fill,g_auto__c_scale,w_798.jpg 798w,
park_cxoj4k_ar_4_3,c_fill,g_auto__c_scale,w_934.jpg 934w,
park_cxoj4k_ar_4_3,c_fill,g_auto__c_scale,w_1078.jpg 1078w,
park_cxoj4k_ar_4_3,c_fill,g_auto__c_scale,w_1200.jpg 1200w,
park_cxoj4k_ar_4_3,c_fill,g_auto__c_scale,w_1339.jpg 1339w,
park_cxoj4k_ar_4_3,c_fill,g_auto__c_scale,w_1388.jpg 1388w">
<source
media="(min-width: 992px) and (max-width: 1199px)"
sizes="(max-width: 2400px) 60vw, 1440px"
srcset="
park_cxoj4k_ar_16_9,c_fill,g_auto__c_scale,w_596.jpg 596w,
park_cxoj4k_ar_16_9,c_fill,g_auto__c_scale,w_863.jpg 863w,
park_cxoj4k_ar_16_9,c_fill,g_auto__c_scale,w_1054.jpg 1054w,
park_cxoj4k_ar_16_9,c_fill,g_auto__c_scale,w_1219.jpg 1219w,
park_cxoj4k_ar_16_9,c_fill,g_auto__c_scale,w_1395.jpg 1395w,
park_cxoj4k_ar_16_9,c_fill,g_auto__c_scale,w_1440.jpg 1440w">
<img
sizes="(max-width: 7000px) 40vw, 2800px"
srcset="
park_cxoj4k_c_scale,w_480.jpg 480w,
park_cxoj4k_c_scale,w_712.jpg 712w,
park_cxoj4k_c_scale,w_902.jpg 902w,
park_cxoj4k_c_scale,w_1068.jpg 1068w,
park_cxoj4k_c_scale,w_1218.jpg 1218w,
park_cxoj4k_c_scale,w_1317.jpg 1317w,
park_cxoj4k_c_scale,w_1346.jpg 1346w,
park_cxoj4k_c_scale,w_1407.jpg 1407w,
park_cxoj4k_c_scale,w_1511.jpg 1511w,
park_cxoj4k_c_scale,w_1555.jpg 1555w,
park_cxoj4k_c_scale,w_1597.jpg 1597w,
park_cxoj4k_c_scale,w_1548.jpg 1548w,
park_cxoj4k_c_scale,w_1604.jpg 1604w,
park_cxoj4k_c_scale,w_1670.jpg 1670w,
park_cxoj4k_c_scale,w_1741.jpg 1741w,
park_cxoj4k_c_scale,w_1811.jpg 1811w,
park_cxoj4k_c_scale,w_1880.jpg 1880w,
park_cxoj4k_c_scale,w_1948.jpg 1948w,
park_cxoj4k_c_scale,w_2012.jpg 2012w,
park_cxoj4k_c_scale,w_2079.jpg 2079w,
park_cxoj4k_c_scale,w_2146.jpg 2146w,
park_cxoj4k_c_scale,w_2212.jpg 2212w,
park_cxoj4k_c_scale,w_2340.jpg 2340w,
park_cxoj4k_c_scale,w_2464.jpg 2464w,
park_cxoj4k_c_scale,w_2457.jpg 2457w,
park_cxoj4k_c_scale,w_2683.jpg 2683w,
park_cxoj4k_c_scale,w_2728.jpg 2728w,
park_cxoj4k_c_scale,w_2799.jpg 2799w,
park_cxoj4k_c_scale,w_2800.jpg 2800w"
src="park_cxoj4k_c_scale,w_2800.jpg"
alt="">
</picture>




The simple and less work is the magical url of Cloudinary.
The magic url is `https://res.cloudinary.com/paulportfolio/image/upload/f_auto,q_auto/ar_4:3,c_fill/c_scale,w_auto/dpr_auto/v1630365154/park.jpg`

The attributes, `f_auto`, and `q_auto` allow for Cloudinary to pick the format and quality of the image. Those two attributes pick a format such as `avif`,`webp`,and `jpg` and also pick the quality of the image.

![Our National Parks](https://res.cloudinary.com/paulportfolio/image/upload/f_auto,q_auto/ar_4:3,c_fill/c_scale,w_auto/dpr_auto/v1630365154/park.jpg)
