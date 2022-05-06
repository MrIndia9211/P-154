//Terrain Rotation
AFRAME.registerComponent("terrain-rotation-reader", {
  schema: {
    speedOfRotation: { type: "number", default: 0 },
  },
  init: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        if (this.data.speedOfRotation < 0.4) {
        this.data.speedOfRotation += 0.01;
        }
      }
      if (e.key === "ArrowLeft") {
        if (this.data.speedOfRotation > -0.4) {
          this.data.speedOfRotation -= 0.01;
        }
      }
    
    });
  },
  tick: function () {
    var mapRotation = this.el.getAttribute("rotation");

    mapRotation.y += this.data.speedOfRotation;

    this.el.setAttribute("rotation", {
      x: mapRotation.x,
      y: mapRotation.y,
      z: mapRotation.z,
    });
  },
});

//Plane rotation component
AFRAME.registerComponent("driver-rotation-reader", {
  schema: {
    speedOfRotation: { type: "number", default: 0 },
    speedOfAscent: { type: "number", default: 0 }
  },
  init: function () {
    window.addEventListener("keydown", (e) => {

      //get the data from the attributes
      this.data.speedOfRotation = this.el.getAttribute("rotation");      
      this.data.speedOfAscent = this.el.getAttribute("position");

      var playerRotation = this.data.speedOfRotation;      
      var playerPosition = this.data.speedOfAscent;

      //control the attributes with the Arrow Keys
      if (e.key === "ArrowRight") {
        if (playerRotation.x < 10) {
          playerRotation.x += 0.9;
          this.el.setAttribute("rotation", playerRotation);
        }
      }
      if (e.key === "ArrowLeft") {
        if (playerRotation.x > -10) {
          playerRotation.x -= 0.7;
          this.el.setAttribute("rotation", playerRotation);
        }
      }
      if (e.key === "ArrowUp") {
        if (playerRotation.z < 20) {
          playerRotation.z += 0.9;
          this.el.setAttribute("rotation", playerRotation);
        }
        if (playerRotation.y < 2) {
          playerRotation.y += 0.07;
          this.el.setAttribute("position", playerRotation);
        }
      }
      if (e.key === "ArrowDown") {
        if (playerRotation.z > -10) {
          playerRotation.z -= 0.7;
          this.el.setAttribute("rotation", playerRotation);
        }
        if (playerPosition.y > -8) {
          playerPosition.y -= 0.07;
          this.el.setAttribute("position", playerPosition);
        }
      }
    });
  }
});
