---
title: 'Teaching Max'
date: 2016-01-03 11:54
excerpt: 'Notes on 264 Tools, a modular package of Max patches for live performance, and using them to teach Max/MSP.'
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
Last semester I assisted [Hans Tutschku](http://www.tutschku.com/) with a class (called Music 264) at Harvard University on improvisation with electronics, and we used [Max](https://cycling74.com/max/) as our main tool for the students to build their own electronic “instruments.” Faced with students ranging from Max beginners to more experienced programmers, and wanting to spend as much time as possible making music, we needed a solution that would allow us to teach Max and simultaneously start exploring performance.

I wanted to write up some of our experiences, in particular focusing on a package of Max patches I built for the class called [264 Tools](https://github.com/mus264/264-tools).

#### Getting Max to make music

The common approach to Max-learning of spending time with [the famous tutorials](https://docs.cycling74.com/max7/tutorials/00_maxindex) can be helpful, but what to actually _do_ with all this list processing, data type explanations, and mathematics can be less clear. It favours abstract thinkers and people with existing programming experience, but may be less useful to someone without that experience who wants to start making music. Besides, [there are important reasons for not just sending someone off to learn by themselves or assuming prior knowledge](http://www.npr.org/sections/money/2014/10/17/356944145/episode-576-when-women-stopped-coding).

Even if one is familiar with Max, it takes time to build things that can start to be musical and responsive. The process of moving from some kind of controller input, handling that data, and mapping it to some audio processing takes time. Building a delay unit or even a versatile sound file player takes time. It is possible to teach this type of programming in a semester, but probably not in a class where you want much music to happen.

{% picture alignright 2016/01/264-delay.png alt="264 Tools delay module in Max" %}

By building [264 Tools](https://github.com/mus264/264-tools) we tried to circumvent these challenges for both new and more advanced Max users. 264 Tools is a collection of patches for Max that can be loaded in `bpatcher` modules, providing ready-to-use playback, processing, and analysis tools with graphical interfaces. To any users who have played with [BEAP](https://cycling74.com/2015/09/15/a-few-minutes-with-beap-tutorial-series/ "A Few Minutes With BEAP, Part 1 — Cycling '74"), this will be a familiar approach — the difference being that where BEAP focuses on sound synthesis, 264 Tools modules provide ways of working with recorded and live audio input.

These modules don’t do anything particularly new on the inside. Several rely heavily on amazing existing work by [members of the open-source community](https://github.com/mus264/264-tools#acknowledgments): [Ivica Ico Bukvic](http://ico.bukvic.net/), Ji-Sun Kim, [Dan Trueman](http://www.manyarrowsmusic.com/), [R. Luke DuBois](http://lukedubois.com/) (`munger~`); [Patrick Delges](http://www.crfmw.be/max/) (`filesys`); [Randy Jones](http://madronalabs.com/) (`yafr2`); Miller Puckette, Cort Lippe, [Ted Apel](http://vud.org/), [Volker Böhm](http://vboehm.net/) (`sigmund~`); [Jean-François Charles](http://www.jeanfrancoischarles.com/) (spectral freezing); [Rodrigo Constanzo](http://www.rodrigoconstanzo.com/karma), and raja (`karma~`). 264 Tools builds on these by providing graphical interfaces and a consistent way of communicating between modules.[^1]  This is also not an attempt to build a “complete” suite of tools for all contexts. There are some obvious limitations: we found it immensely practical to make everything mono, for example; and the <abbr title="Graphical User Interface">GUI</abbr> makes the modules less performant than they might be. (If you have any Max GUI performance tips, let me know!)

  [^1]: All 264 Tools modules understand messages in the range 0&#8202;–&#8202;127, mimicking standard MIDI, permitting easy communication between modules, as well as with any other MIDI device.

#### Learning by doing

The idea of teaching with 264 Tools was to have students spend as much time as possible inside Max itself, and have that time as musically focused as possible. They may not have mastered `vexpr` or figured out all the ins and outs of `poly~`, and certainly didn’t have to go through the pain of learning how `pattrstorage` works, but they had Max open, were creating and connecting objects, and started to understand how one might extend a module’s functionality by adding a few basic Max objects. Most importantly, from the first week we were working with sound. For people with backgrounds in music, the immediate feedback of hearing changes — rather than only understanding them abstractly — is very helpful.

To keep students immersed in Max we exploited the strengths of Max’s package system.[^2] In particular, by using the `extras` directory in the package we could provide weekly patches introducing new modules that would appear in Max’s ‘Extras’ menu. These overviews provided explanations of each module’s functionality alongside demonstrations. Students could play with the demos and copy-paste bits of patch to their own projects. (I’m currently [in the process](https://github.com/mus264/264-tools/issues/4) of converting much of this to proper help files.)

{% picture 2016/01/264-extras-menu.png alt="Max 7 Extras menu showing 264 Tools Overview." %}

  [^2]: [First introduced with Max 6](https://cycling74.com/2013/03/11/max-6-feature-packages/), packages have just received an exciting boost with the release of Max 7.1 and the [new native Package Manager](https://cycling74.com/2015/12/14/introducing-the-max-package-manager/). We were using Nathanaël Lécaudé’s [Max Package Downloader](https://github.com/natcl/max_package_downloader), which was a wonderful stop-gap before Cycling '74 introduced their own solution.

In our first week, 264 Tools consisted of a delay line, a sound file player, and a filter. We added a couple of modules each week from then on.[^3] As students built performance patches for class, it was astonishing to see the variety of possibilities they uncovered, even with a minimum of modules.

  [^3]: An up-to-date list of the current modules can be found in [the 264 Tools GitHub repository](https://github.com/mus264/264-tools#current-functionality).

{% picture 2016/01/264-filter-reverb.png alt="A Max 7 patch using 264 Tools modules." %}

#### Beyond the laptop

The most obvious requirement in order to make the students’ patches “performable” in improvisatory contexts was a controller that probably wasn’t the laptop’s trackpad or keyboard. We ended up building lightweight performance kits, and chose [Korg nanoKONTROL2](http://www.korg.com/us/products/controllers/nanokontrol2/) MIDI controllers for the students to interact with their patches. These provide 8 faders, 8 dials, and 35 buttons and send MIDI messages over USB.

We built all 264 Tools modules to work seamlessly with any external MIDI controller. You can quickly map a MIDI fader, dial, or button to your patch using the `264.midi-learn` submodule, which is built into many of the 264 Tools modules.

Beyond the MIDI controller, we also provided students with a microphone, a single-input audio interface, and a loudspeaker. It was great to be able to keep each performer’s audio discrete using these performance kits, clarifying who was producing which sounds in group performances. This tied into a kind of “instrumental” thinking while developing 264 Tools: mono sources, processing, and output lent themselves to these multi-laptop performances.

<figure markdown="1">
{% picture 2016/01/264-whiteboard-diagram.jpg alt="Whiteboard diagram of electronics set-up for a performance." %}
<figcaption>Whiteboard diagram in preparation for end-of-semester performances.</figcaption>
</figure>

#### Conclusions

By the end of the semester our students were able to perform improvisations, in some cases with no prior Max knowledge. While my teacher’s pride undoubtedly clouds my judgement, I was incredibly impressed by the students’ work. I can also say that a classroom of captive beta testers is an amazing resource to have while trying to build something like this. We finished up with 22 modules, from a MIDI-ready `toggle` to a pitch-tracker, and built a fairly easy to use preset system (I cursed `pattrstorage` so no-one else had to).

If you want to try out the tools for yourself, take a look at [__the installation instructions__](https://github.com/mus264/264-tools#installation). With any luck, I’ll submit this to Max 7’s Package Manager soon, to enable simpler updating.

I’d love to hear from anyone else teaching Max about their experiences, and if anyone does play around with 264 Tools, let me know what you think!
