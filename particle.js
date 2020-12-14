var gravity = -.000003;
var drag = .999999999999995;

class Particle {
    
    constructor() {
        var r = Math.random();
        if (r < .25) {
            r += .3;
        }
        this.radius = glMatrix.vec3.fromValues(r/4, r/4, r/4);
        this.color = glMatrix.vec3.fromValues(Math.random(), Math.random(), Math.random());
        
        this.position = glMatrix.vec3.fromValues(Math.random()*2 - 1, Math.random()*2 - 1, Math.random()*2 - 1);
        this.velocity = glMatrix.vec3.fromValues(Math.random()/2000000, Math.random()/2000000, Math.random()/2000000);
        this.acceleration = glMatrix.vec3.fromValues(0.0, (gravity/10000000), 0.0);
        this.lastTime = Date.now();
        //variable to store number of consecutive number of updates that the particle has been either on the ground, or not (barely) moving in order to remove it from the render after 500 updates
        this.dead = 0;
    }
    
    /**
    * Update the position using the current velocity and Euler integration.
    * This includes the necessary aspects of collision handling to create accurate bounces bounded by the 2x2x2 box.
    */
    updatePosition(){
        var seconds = Date.now() - this.lastTime / 1000; 
        this.position[0] = this.position[0] + (this.velocity[0] * seconds) * .0000001;        
        this.position[1] = this.position[1] + (this.velocity[1] * seconds) * .0000001; 
        this.position[2] = this.position[2] + (this.velocity[2] * seconds) * .0000001;
        if (this.position[0] - this.radius[0] < -1) {
            this.position[0] = -1 + this.radius[0];
            this.velocity[0] = this.velocity[0] * -1;
        } else if (this.position[0] + this.radius[0] > 1) {
            this.position[0] = 1 - this.radius[0];
            this.velocity[0] = this.velocity[0] * -1;
        }
        if (this.position[1] - this.radius[0] < -1) {
            this.position[1] = -1 + this.radius[0];
            this.velocity[1] = this.velocity[1] * -1;
        } else if (this.position[1] + this.radius[0] > 1) {
            this.position[1] = 1 - this.radius[0];
            this.velocity[1] = this.velocity[1] * -1;
        }
        if (this.position[2] - this.radius[0] < -1) {
            this.position[2] = -1 + this.radius[0];
            this.velocity[2] = this.velocity[2] * -1;
        } else if (this.position[2] + this.radius[0] > 1) {
            this.position[2] = 1 - this.radius[0];
            this.velocity[2] = this.velocity[2] * -1;
        }
//        console.log("X: " + this.position[0] +" Y: " + this.position[1] + " Z: " + this.position[2]);
    }
    
    
    /**
    * Update the velocity using the acceleration and Euler integration and drag.
    */
    updateVelocity() {
        var seconds = Date.now() - this.lastTime / 1000; 
        this.velocity[0] = this.velocity[0] * (drag ** seconds);
        this.velocity[1] = this.velocity[1] * (drag ** seconds) + (this.acceleration[1] * seconds) * .0000001; 
        this.velocity[2] = this.velocity[2] * (drag ** seconds);
        //console.log(this.position[1]);
    }
    
    checkDead() {
        if (this.position[1] - this.radius[0] <= -.99999999 || (this.velocity[0] <= .0000000001) && (this.velocity[1] <= .0000000001) && (this.velocity[2] <= .0000000001)) {
            this.dead += 1;
        } else {
            this.dead = 0;
        }
        console.log(this.dead);
    }
    
    /**
    * Update the acceleration using the forces of gravity. Idk how to do this one at all rip
    */
    updateAcceleration() {
        //nothing? idk
        this.acceleration = glMatrix.vec3.fromValues(0.0, (gravity/10000000), 0.0);
    }
    
    updateParticleInfo() {
        this.updatePosition();
        this.updateVelocity();
        this.updateAcceleration();
        this.checkDead();
    }
    
}