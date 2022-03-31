“Don’t underestimate the Force.”
>forces
In the final example of Chapter 1, I demonstrated how to calculate a dynamic acceleration based on a vector pointing from a circle on the canvas to the mouse position. The resulting motion resembles a magnetic attraction between shape and mouse, as if some *force* was pulling the circle in towards the mouse. In this chapter I will detail the concept of a force and its relationship to acceleration. The goal, by the end of this chapter, is to build a simple physics engine and understand how objects move around a canvas by responding to a variety of environmental forces.
## 2.1 Forces and Newton’s Laws of Motion
>forces / Newton's laws of motion
>Newton / Isaac
Before I examine the practical realities of simulating forces and building a basic physics engine in code, let’s take a conceptual look at what it means to be a force in the real world. Just like the word “vector,” the term “force” can be used to mean a variety of things. It can indicate a powerful intensity, as in “They pushed the boulder with great force” or “They spoke forcefully.” The definition of ***force*** that I care about is more formal and comes from Sir Isaac Newton’s laws of motion:
>forces / defined
>A force is a vector that causes an object with mass to accelerate.
The good news is that you hopefully recognize the first part of the definition: *a force is a vector*. Thank goodness you just spent a whole chapter learning what a vector is and how to program with vectors!
Let’s define Newton’s three laws of motion in relation to the concept of a force.
### Newton’s First Law
>Newton's first law
Newton’s first law is commonly stated as:
>An object at rest stays at rest and an object in motion stays in motion.
However, this is missing an important element related to forces. I could expand the definition by stating:
>An object at rest stays at rest and an object in motion stays in motion at a constant speed and direction unless acted upon by an unbalanced force.
>Aristotle
By the time Newton came along, the prevailing theory of motion—formulated by Aristotle—was nearly two thousand years old. It stated that if an object is moving, some sort of force is required to keep it moving. Unless that moving thing is being pushed or pulled, it will simply slow down or stop. Right?
>equilibrium
>forces / equilibrium
>forces / terminal velocity
>terminal velocity
This, of course, is not true. In the absence of any forces, no force is required to keep an object moving. An object (such as a ball) tossed in the earth’s atmosphere slows down because of air resistance (a force). An object’s velocity will only remain constant in the absence of any forces or if the forces that act on it cancel each other out, i.e. the net force adds up to zero. This is often referred to as ***equilibrium***. The falling ball will reach a terminal velocity (that stays constant) once the force of air resistance equals the force of gravity.
![ch01_img]( chapter02/ch02_01.png)
Considering a p5.js canvas, I could restate Newton’s first law as follows:
>Newton's first law / PVector class and
>PVector class (Processing) / Newton's first law and
>An object’s velocity vector will remain constant if it is in a state of equilibrium.
Skipping Newton’s second law (arguably the most important law for the purposes of this book) for a moment, let’s move on to the third law.
>Newton's third law
### Newton’s Third Law
This law is often stated as:
>For every action there is an equal and opposite reaction.
This law frequently causes confusion in the way that it is stated. For one, it sounds like one force causes another. Yes, if you push someone, that someone may *actively* decide to push you back. But this is not the action and reaction referred to in Newton’s third law.
Let’s say you push against a wall. The wall doesn’t actively decide to push back on you. There is no “origin” force. Your push simply includes both forces, referred to as an “action/reaction pair.”
A better way of stating the law might be:
>Forces always occur in pairs. The two forces are of equal strength, but in opposite directions.
Now, this still causes confusion because it sounds like these forces would always cancel each other out. This is not the case. Remember, the forces act on different objects. And just because the two forces are equal, it doesn’t mean that the movements are equal (or that the objects will stop moving).
Consider pushing on a stationary truck. Although the truck is far more powerful than you, unlike a moving one, a stationary truck will never overpower you and send you flying backwards. The force you exert on it is equal and opposite to the force exerted on your hands. The outcome depends on a variety of other factors. If the truck is a small truck on an icy downhill, you’ll probably be able to get it to move. On the other hand, if it’s a very large truck on a dirt road and you push hard enough (maybe even take a running start), you could injure your hand.
And if you are wearing roller skates when you push on that truck?
![ch01_img]( chapter02/ch02_02.png)
You’ll accelerate away from the truck, sliding along the road while the truck stays put. Why do you slide but not the truck? For one, the truck has a much larger mass (which I’ll get into with Newton’s second law). There are other forces at work too, namely the friction of the truck’s tires and your roller skates against the road.
### Newton’s Third Law (as seen through the eyes of p5.js)
>Newton's third law / PVector class and
>PVector class (Processing) / Newton's third law and
>If you calculate a p5.Vector >f> that is a force of object A on object B, you must also apply the force—>p5.Vector.mult(f, -1)>;—that B exerts on object A.
You’ll soon see that in the world of coding simulation, it’s often not necessary to stay true to the above. Sometimes, such as in the case of [gravitational attraction between bodies](#chapter02_example6)
gravitational attraction between bodies, I’ll want to model equal and opposite forces in my example code. Other times, such as a scenario where I‘ll say, “Hey, there’s some wind in the environment,” I’m not going to bother to model the force that a body exerts back on the air. In fact, I’m not going to bother modeling the air at all! Remember, this examples in this book are taking inspiration from the physics of the natural world for the purposes of creativity and interactivity and do not require perfect precision.
## 2.2 Forces and p5.js—Newton’s Second Law as a Function
>acceleration / Newton's second law
>natural phenomena / Newton's second law / modeling
>Newton's second law
Now it‘s time for most important law for you, the p5.js coder.
### Newton’s Second Law
This law is stated as:
>Force equals mass times acceleration.
Or:
$$ \vec{F} = M \times \vec{A} $$Why is this the most important law for this book? Well, let’s write it a different way.
$$ \vec{A} = \vec{F} / M $$Acceleration is directly proportional to force and inversely proportional to mass. This means that if you get pushed, the harder you are pushed, the faster you’ll move (accelerate). The bigger you are, the slower you’ll move.
>density
>mass / weight vs.
>weight / mass vs.
>Weight vs. Mass
Now, in the world of p5.js, what is mass anyway? Aren’t we dealing with pixels? To start in a simpler place, let’s say that in a pretend pixel world, all objects have a mass equal to 1. F / 1 = F. And so:
$$ \vec{A} = \vec{F} $$The acceleration of an object is equal to force. This is great news. After all, in Chapter 1 I described acceleration as the key to controlling the movement of objects on a canvas. position changes according to velocity, and velocity according to acceleration. Acceleration was where it all began. Now you can see that *force* is truly where it all begins.
Let’s take the Mover class, with position, velocity, and acceleration.

 ``` 
class Mover {
  constructor(){
    this.position = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
  }
}
 ``` 

Now the goal is to be able to add forces to this object, with code something like:

 ``` 
mover.applyForce(wind);
 ``` 

or:

 ``` 
mover.applyForce(gravity);
 ``` 

where wind and gravity are p5.Vector objects. According to Newton’s second law, I could implement this function as follows.

 ``` 
applyForce(force) {
  //{!1} Newton's second law at its simplest.
  this.acceleration = force;
}
 ``` 

## 2.3 Force Accumulation
>forces / accumulation of
This looks pretty good. After all, *acceleration = force* is a literal translation of Newton’s second law (in a world without mass). Nevertheless, there’s a pretty big problem here which I’ll quickly encounter when I return to my original goal: creating object that responds to wind and gravity forces.

 ``` 
mover.applyForce(wind);
mover.applyForce(gravity);
mover.update();
 ``` 

OK, I’ll *be* the computer for a moment. First, I call applyForce() with wind. And so the Mover object’s acceleration is now assigned the vector wind. Second, I call applyForce() with gravity. Now the Mover object’s acceleration is set to the gravity vector. Finally, I call update(). What happens in update()? Acceleration is added to velocity.

 ``` 
this.velocity.add(this.acceleration);
 ``` 

If you run this code, you will not see error in the console, but zoinks! There’s a major problem. What is the value of acceleration when it is added to velocity? It is equal to the gravity vector. Wind has been left out! Anytime applyForce() is called, acceleration is overwritten. How can I handle more than one force?
>force accumulation
The answer lies in the full definition of Newton’s second law itself which I now to confess to having simplified. Here’s a more accurate way to put it:
>Net Force equals mass times acceleration.
Or, acceleration is equal to the *sum of all forces* divided by mass. This makes perfect sense. After all, as you saw in Newton’s first law, if all the forces add up to zero, an object experiences an equilibrium state (i.e. no acceleration). This can be implemented through a process known as ***force accumulation***— adding all of the forces together. At any given moment, there might be 1, 2, 6, 12, or 303 forces. As long as the object knows how to accumulate them, it doesn’t matter how many forces act on it.

 ``` 
applyForce(force) {
  //{!1} Newton's second law, but with force accumulation. I now add each force to acceleration, one at a time.
  this.acceleration.add(force);
}
 ``` 

Now, I’m not finished just yet. Force accumulation has one more piece. Since I’m adding all the forces together at any given moment, I have to make sure that I clear acceleration (i.e. set it to zero) before each time update() is called. Consider a wind force for a moment. Sometimes wind is very strong, sometimes it’s weak, and sometimes there’s no wind at all. For example, you might write code that creates a gust of wind, say, when the user holds down the mouse.

 ``` 
if (mouseIsPressed) {
  let wind = createVector(0.5, 0);
  mover.applyForce(wind);
}
 ``` 

>acceleration / force accumulation and
When the user releases the mouse, the wind should stop, and according to Newton’s first law, the object continues moving at a constant velocity. However, if I forgot to reset acceleration to zero, the gust of wind would still be in effect. Even worse, it would add onto itself from the previous frame! Acceleration, in a time-based physics simulation, has no memory; it is calculated based on the environmental forces present at any given moment (frame) in time. This is different than, say, position, which must remember its previous location in order to move properly to the next.
One way to implement clearing the acceleration for each frame is to multiply the vector by 0 at the end of update().

 ``` 
update() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  // Clearing acceleration after it's been applied
  this.acceleration.mult(0);
}
 ``` 

>Exercise 2.1
## 2.4 Dealing with Mass
>mass / modeling
>natural phenomena / mass / modeling
OK. I’ve got one small (but fundamental) addition to make before integrating forces into the Mover class. After all, Newton’s second law is really \vec{F} = M \times \vec{A}, not \vec{F} = \vec{A}. Incorporating mass is as easy as adding an instance variable to the class, but I need to spend a little more time here because of another impending complication.
First I’ll add mass.