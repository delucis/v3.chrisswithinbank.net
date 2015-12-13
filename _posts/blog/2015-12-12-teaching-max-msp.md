---
title: 'Teaching Max'
date: 2015-12-12 21:54
excerpt: ''
comments: true
tags:
  - teaching
  - pedagogy
  - Harvard University
  - Music 264
  - Max/MSP
  - Cycling 74
  - computer music
  - improvisation
featured_image: 2015/12/264-tools.png
featured_image_alt: Some modules from the 264 Tools Max package.
featured_image_caption: Some modules from the [264 Tools](https://github.com/mus264/264-tools) Max package.
---
For the past semester I’ve been assisting [Hans Tutschku](http://www.tutschku.com/) with a class (Music 264) at Harvard University on improvisation with electronics, and we’ve been using [Max](https://cycling74.com/max/) as our main tool for the students to build their own electronic “instruments.” Faced with students ranging from Max beginners to more experienced programmers, and wanting to spend as much time as possible making music, we needed a solution that would allow us to teach Max and simultaneously start exploring performance.

I wanted to write up some of our experiences and describe how we got to the point the students could perform in a final concert featuring live electronics in just one semester, in particular focusing on a package of Max patches I built for the class called [264 Tools](https://github.com/mus264/264-tools).

#### Hardware set-up

We realised we needed as simple and lightweight as possible a performance environment that students could plug into, which ended up forming small kits including a microphone, a single-input audio interface, a loudspeaker, and a [Korg nanoKONTROL2](http://www.korg.com/us/products/controllers/nanokontrol2/) MIDI controller. It was great to be able to keep each performer’s audio discrete, clarifying who was producing which sounds in group performances.

#### Getting Max to make music

Even if one is familiar with Max, it takes time to build things which can start to be musical. The process of moving from some kind of controller input, handling that data, and mapping it to some audio processing takes time. Building a delay unit or even a versatile sound file player takes time. The first time I opened Max/MSP (four-point-something at the time) and did [the famous Max tutorials](https://docs.cycling74.com/max7/tutorials/00_maxindex), I still finished without really understanding what I could actually *do* with all this list processing and data types and maths.
