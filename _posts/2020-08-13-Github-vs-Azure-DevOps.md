---
layout: post
title: Azure Devops vs Github
subtitle: More switches bad. Less switches good.
author: Kris Camilleri
tags: ["User Experience (UX)", "Project Management", "Best Practices"]
timeToRead: 3'10"
---

A tale of Microwaves & Premature Optimization.

## The Microwave Moment

_"The objective was food. What I found, was distraction."_

Earlier in my life, when shopping around for a microwave (or just about any appliance), I used to be the person hunting for the most knobs and switches. Aside from the promise of convenience, every extra button represented a problem that the manufacturer had graciously worried about on my behalf, so I didn't have to. Double win!

A better person than me likely takes a lot of pride in their many buttons and knobs, pouring over the manual for tricks and tips at every opportunity; memorizing the subtle differences in icon and duration between the 'Popcorn' and 'Beverage' options; Maximizing the use of 'Oven Mode' when heating leftovers for that succulent crunchy finish; _Certainly_ not accidentally resetting the clock every-time they want to set an alarm.

As I've come to discover in my adult life, I am not that person. I began skimming through the manual once... then I got hungry. I cranked the temperature to max, and set the timer for 1 minute. I ate, and moved on with my life.

Nothing has changed since. When something is still cold at the end of that 1 minute, I repeat the process... until it's not. I now look at the many knobs and switches not as solutions to prospective problems, but as perpetual distractions whenever I reach for a bag of uncooked popcorn.

If only I went for the simpler microwave...

## A Developer's Siren Song: Premature Optimization

Now that you understand the relevant parts of my psyche let's meander to the tech talk. For context, at the time of writing Pretty Neat is a small agency juggling a handful of clients and internal projects.

Cue our recent foray into Azure Devops. All the knobs and switches! If you can imagine it, odds are there's a configuration option for it. Every Agile consultant's wet dream!

![Azure Devops documentation of the user card. All the knobs and switches!](/assets/blog/azure_devops_complex_card.png)

_Look at all the knobs and switches! Just look at them..._

Thus, with a few days budgeted for building our workflow around Azure Devops, we began pouring through the documentation, poking around with a couple of repositories and project boards, and generally structuring things 'by the book'. Immaculate project structures, descriptive, well labelled user stories and sprints abound. Good feels all round.

That is, until the actual work of software development started pouring in. In a world where the client needs something done _yesterday_ - pristinely documenting perpetually changing requirements is a luxury that _ought_ to be reserved for the fictional project manager. In practice though, it became a wonderful way for us developers to feel good about doing a whole lot of low-value project management busy work. **A premature optimization for the sophisticated reporting and review process that never existed.**

In response to this degradation of productivity, every non-essential setting was quickly tossed by the wayside in our quest to _Get Shit Done_. We stripped down Azure Devops to its very simplest repository, Kanban and sprint management feature set... but what we were left with was a UX that never stopped advertising its potential complexity.

The final nail in the coffin was struck when project management started bubbling back out into meat-space. Sticky notes, whiteboards, and heaps of scribbled papers... the antithesis of what we aspired for.

The equivalent of using the stove instead of the shiny new microwave. Less than ideal... back to the drawing board.

## Where's my food?

What we needed was 'maximum heat for 1 minute'. What we ended up with a surgically precise but totally impractical microwave rail-gun with a thousand buttons. Oh, and our metaphorical food was still cold.

Enter Github. Dumb by default. A kanban board for the team, and another per project. A Git repository store, with some serverless actions to tie things together. No WYSIWYG editors in sight - Markdown for everything. Wonderfully unsophisticated, barebones and straightforward.

![Look at the total lack of knobs and switches! Just look at it...](/assets/blog/github_simple_card.png)

_Look at **the total lack** of knobs and switches! Just look at it..._

We're now crossing into the second month of our transition to Github from Azure Devops for our project management - and we have absolutely no intention of looking back.

## So, what did we learn?

- Resist premature optimization at an organizational level - by not dangling configurations that aren't _immediately_ necessary.
- If you can get away with doing something simply - do it simply. Add complexity gradually and only as needed.
- If project management is becoming as time consuming as the actual project - you're doing it wrong.

<br>
**TLDR**: More switches bad. Less switches good.
