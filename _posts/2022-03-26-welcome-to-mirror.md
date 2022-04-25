---
layout: post
title: Multiplayer in Unity with Mirror
subtitle: Free, self-hostable and open-source.
author: Hristo Petrov
image: '/assets/blog/unity-logo.png'
tags: ["Unity Development", "Open Source", "Games", "Multiplayer"]
timeToRead: 3'50"
---

Once upon a time, Unity provided a first party multiplayer framework - UNet. That's gone. Thankfully, there's Mirror.


# Mirror framework: The better Unity’s UNet replacement


Unfortunately, despite it still being  a class leading networking solution, it was no longer directly supported by the company. In UNet's stead, other multiplayer services came in to fill in its shoes (ex Photon), but they are notoriously more expensive (because they charge per connected "player").

That said, an individual who goes by the handle [vis2k](https://assetstore.unity.com/publishers/13005) created a MMORPG framework **uMMORPG** - which under the hood utilized what is now known as the ***Mirror Networking Framework***. What's wonderful about it is that it's API isn't all too different from UNET and it's free, self-hostable and open source. It's designed to be performant and suited to any scope — from small hobby projects to full-blown MMOs.

Below is a demo of uMMORPG, with 480 players in a small map. As you can see, Mirror is fast and stable.

https://www.youtube.com/watch?v=mDCNff1S9ZU

# Setup

Since Mirror is a great open source 3rd party networking plugin, it also provides a very friendly and understandable API.
 ![https://tenor.com/view/wink-wow-eddy-wally-gif-5514959](https://c.tenor.com/XNBmVkdwkIAAAAAC/wink-wow.gif)

**Step 1**
  You will need Unity for this :D.

![enter image description here](https://media0.giphy.com/media/DMtMg3sW1cSdi/giphy.gif?cid=ecf05e47iy54yhmhxd66xm8uco7r98x53tsde2ifov5c6nrv&rid=giphy.gif&ct=g)

Download Mirror either from [Unity Asset Store](https://assetstore.unity.com/packages/tools/network/mirror-129321) or from their [github repository](https://github.com/vis2k/Mirror/releases/)  

**Step 2**

Create a empty project (2d or 3d). Import the mirror unity package.

**Step 3**

To make Mirro work with your empty scene, you need to create an empty gameobject called Network Manager. Next, add NetworkManager and NetworkManagerHUD components to this gameobject. If you did everything correctly, upon starting the scene you should see this.

![NetworkManagerHUD](https://miro.medium.com/max/460/1*nSMmLoOha7KLzVqE0f-LTQ.png)

**NetworkManagerHUD**

Now you have multiplayer game - well, minus the game :D

![enter image description here](https://c.tenor.com/tS2sh1XgewwAAAAC/ricky-gervais-dancing.gif)

To write your custom networking code, you need to replace MonoBehaviour with NetworkBehaviour
 
## APIs and Development Experience

The client-server aspect of Mirror uses commands, RPCs, and SyncVars - all of which are coming from the NetworkBehaviour class. Using these things, Mirror is able to give you a high quality API experience.

![Client-Server Communication Diagram ](https://miro.medium.com/max/1400/0*-oZy0z-uKox9EH87)


-----

**Commands**

Commands are a way for the player to call functions of networked objects on the server when the player has authority over them (which the server can assign). Let's give an example for player HP and Mana.

  

    [Command]
    public void CmdHeal(){
       this.hp = this.maxHp;
    }
    
    [Command]
    public void CmdMana(){
	    this.mana = this.maxMana;
    }

**RPCs ( Remote procedural calls )**

They are precisely the opposite of the commands. They are used by the server to call functions on the client side.

    [ClientRpc]
    public void RpcShoot(){
     	PlaySound();
    	CreateEffect();
    }

**Synchronization**

Synchronization attributes like SyncVars, SyncList and others are variables which are kept in sync between the server and the client. They allow adding client change hooks to react to value changes.


	[SyncVar(hook="OnHealthChange")]
	int hp;
	public void OnHealthChange(int prevHp, int newHp){
		...
	}

[Read more about Synchronization](https://mirror-networking.gitbook.io/docs/guides/synchronization)
  
NetworkBehaviour also provides you network events, such as as server and client Start events,

	public override void OnStartServer(){
		...
	}

	public override void OnStartClient(){
		...
	}

[Read More about NetworkBehaviour Callbacks](https://mirror-networking.gitbook.io/docs/guides/communications/networkbehaviour-callbacks)

and you can declare functions for only the server, or for the client like bellow
 

	[Server]
	public void Pretty(){
		...
	}

	[Client]
	public void Neat(){
		...
	}

## What Mirror offers
Besides all the code and examples, Mirror also offers a large range of components, like lan, lobbies, chat, huds, game managers, discoverability to networked components and much more!

![Mirror’s Layered Design](https://miro.medium.com/max/1400/0*CEj14eb0MosCtgAY)

****Mirror’s Layered Design****

The API in general is very solid with many tools and components, so it makes development fast and easy.

## Resources and Documentation
As I mentioned before Mirror is based on UNet - Unity Networking deprecated plugin.

What that means. It means documentation, answers and learning resources are widely available.

As a user who used UNet before for small and simple multiplayer games, I can say Mirror is a very delicious cookie.

You can check [Mirror Webiste](https://mirror-networking.com/) for documentation, tips, examples, videos, deployment strategies and many more...
 
## Warp Up
Mirror is a great open source unity networking plugin. It gives you a very high level API, which is understandable and easy to  integrate to your new amazing game.

Since it's based on UNet, the community is big and you can always find examples or guides.

If you like this article, consider of sharing it with friends, colleagues or family. It's free and it helps a lot

![enter image description here](https://c.tenor.com/Ioo4HqVYj80AAAAC/t-pain-thank-you.gif)