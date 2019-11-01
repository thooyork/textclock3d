
<template>
  <div>
    <div ref="threecontainer" class="threecontainer" v-touch:tap="rayCast"></div>
    <div class="credits">
      coded by thooyork with <img src="@/assets/img/Vue.png"/> and <img src="@/assets/img/heart.png"/> 
    </div>
    <div class="loader" v-if="loading">loading ...</div>
  </div>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

// import * as TONE from 'tone'

export default {
  data(){
    return {
        camera:null,
        scene:null,
        group:null,
        renderer:null,
        controls:null,
        light:null,
        ambientlight:null,
        geometry:null,
        edges:null,
        material:null,
        mesh:null,
        raycaster:null,
        mouse:null,
        meshes:[],
        players:[],
        soundplayer:null,
        INTERSECTED:null,
        loading:true,
        past:false,
        to:false,
        five:false,
        ten:false,
        quarter:false,
        twenty:false,
        half:false,
        clock:false,
        itis:true,
        fps:1,
        now:null,
        then:null,
        interval:null,
        delta:null
    }
  },
  created(){
    
  },
  mounted(){
    this.init();
  },
  methods:{
    init: function() {
        this.then = Date.now();
        this.interval = 1000/this.fps;
        // this.raycaster = new THREE.Raycaster();
        // this.mouse = new THREE.Vector2();

        let matrix = [
          [{'n':'I', 'i':'itis'},{'n':'T', 'i':'itis'},{'n':'K', 'i':''},{'n':'L', 'i':''},{'n':'I', 'i':'itis'},{'n':'S', 'i':'itis'},{'n':'V', 'i':''},{'n':'H', 'i':'half'},{'n':'A', 'i':'half'},{'n':'L', 'i':'half'},{'n':'F', 'i':'half'}],
          [{'n':'T', 'i':'twenty'},{'n':'W', 'i':'twenty'},{'n':'E', 'i':'twenty'},{'n':'N', 'i':'twenty'},{'n':'T', 'i':'twenty'},{'n':'Y', 'i':'twenty'},{'n':'F', 'i':'five'},{'n':'I', 'i':'five'},{'n':'V', 'i':'five'},{'n':'E', 'i':'five'},{'n':'H', 'i':''}],
          [{'n':'K', 'i':''},{'n':'O', 'i':''},{'n':'Q', 'i':'quarter'},{'n':'U', 'i':'quarter'},{'n':'A', 'i':'quarter'},{'n':'R', 'i':'quarter'},{'n':'T', 'i':'quarter'},{'n':'E', 'i':'quarter'},{'n':'R', 'i':'quarter'},{'n':'L', 'i':''},{'n':'Z', 'i':''}],
          [{'n':'T', 'i':'ten'},{'n':'E','i':'ten'},{'n':'N', 'i':'ten'},{'n':'P', 'i':''},{'n':'X', 'i':''},{'n':'T', 'i':'to'},{'n':'O', 'i':'to'},{'n':'P', 'i':'past'},{'n':'A', 'i':'past'},{'n':'S', 'i':'past'},{'n':'T', 'i':'past'}],
          [{'n':'E', 'i':'eight'},{'n':'I', 'i':'eight'},{'n':'G', 'i':'eight'},{'n':'H', 'i':'eight'},{'n':'T', 'i':'eight'},{'n':'T', 'i':'twelve'},{'n':'W', 'i':'twelve'},{'n':'E', 'i':'twelve'},{'n':'L', 'i':'twelve'},{'n':'V', 'i':'twelve'},{'n':'E', 'i':'twelve'}],
          [{'n':'O', 'i':'one'},{'n':'N', 'i':'one'},{'n':'E', 'i':'one'},{'n':'T', 'i':'two'},{'n':'W', 'i':'two'},{'n':'O', 'i':'two'},{'n':'I', 'i':''},{'n':'F', 'i':'four'},{'n':'O', 'i':'four'},{'n':'U', 'i':'four'},{'n':'R', 'i':'four'}],
          [{'n':'T', 'i':'three'},{'n':'H','i':'three'},{'n':'R', 'i':'three'},{'n':'E', 'i':'three'},{'n':'E', 'i':'three'},{'n':'L', 'i':''},{'n':'P', 'i':''},{'n':'F', 'i':'hourFive'},{'n':'I', 'i':'hourFive'},{'n':'V', 'i':'hourFive'},{'n':'E', 'i':'hourFive'}],
          [{'n':'E', 'i':'eleven'},{'n':'L', 'i':'eleven'},{'n':'E', 'i':'eleven'},{'n':'V', 'i':'eleven'},{'n':'E', 'i':'eleven'},{'n':'N', 'i':'eleven'},{'n':'R', 'i':''},{'n':'N', 'i':'nine'},{'n':'I', 'i':'nine'},{'n':'N', 'i':'nine'},{'n':'E', 'i':'nine'}],
          [{'n':'T', 'i':'hourTen'},{'n':'E','i':'hourTen'},{'n':'N', 'i':'hourTen'},{'n':'R', 'i':''},{'n':'W', 'i':''},{'n':'S', 'i':'seven'},{'n':'E', 'i':'seven'},{'n':'V', 'i':'seven'},{'n':'E', 'i':'seven'},{'n':'N', 'i':'seven'},{'n':'M', 'i':''}],
          [{'n':'S', 'i':'six'},{'n':'I', 'i':'six'},{'n':'X', 'i':'six'},{'n':'N', 'i':''},{'n':'O', 'i':'clock'},{'n':'\'', 'i':'clock'},{'n':'C', 'i':'clock'},{'n':'L', 'i':'clock'},{'n':'O', 'i':'clock'},{'n':'C', 'i':'clock'},{'n':'K', 'i':'clock'}]
        ];

        this.camera = new THREE.PerspectiveCamera( 55, this.$refs.threecontainer.clientWidth / this.$refs.threecontainer.clientHeight, 0.01, 400 );
        
        this.camera.position.set(0,0,150);
        this.scene = new THREE.Scene();
        this.group = new THREE.Group();

        this.ambientlight = new THREE.AmbientLight( 0xffffff, .9 );
      
        this.renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha:true
        });

        this.light = new THREE.PointLight(0xffffff, 2);
        this.light.position.set(20,20,30);

        this.renderer.setClearColor(0xffffff, 0);

        this.scene.add(this.ambientlight);
        this.scene.add(this.light);

        this.renderer.setSize(this.$refs.threecontainer.clientWidth, this.$refs.threecontainer.clientHeight);
        this.$refs.threecontainer.appendChild(this.renderer.domElement);

        // var axesHelper = new THREE.AxesHelper( 20 );
        // this.scene.add( axesHelper );
        
        let loader = new THREE.FontLoader();
        loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
        let x = -44;
        let y = 38;
        let color = new THREE.Color(.1,.1,.1);
        for (let j=0; j < matrix.length; j++){
          for (let i=0; i < matrix[j].length; i++){
              let textGeo = new THREE.TextGeometry(matrix[j][i].n, {
                font: font,
                size: 5,
                height: 5,
                bevelEnabled: false
              });
              x += 8;
              textGeo.center();
              textGeo.dispose();
              let identifier = matrix[j][i].i;

              let textMat = new THREE.MeshLambertMaterial({color: color});
              let textMesh = new THREE.Mesh(textGeo, textMat);
              textMesh.identifier = identifier;
              textMesh.position.set(x,y,0);

              this.meshes.push(textMesh);
              this.group.add(textMesh);
          }
          y -= 8;
          x = -44;
        }

        this.scene.add(this.group);
        this.loading = false;

        });
  
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = .1;
        this.controls.maxDistance = 300;
        this.controls.enableZoom = true;
        this.controls.autoRotate = false;

        window.addEventListener( 'resize', this.onWindowResize, false );

        this.animate();

        this.group.rotation.y += 0.2; 
    },
    rayCast: function(event){
      //considering canvas offset
      var rect = this.renderer.domElement.getBoundingClientRect();
      let posX = event.pageX || event.targetTouches[0].pageX;
      let posY = event.pageY || event.targetTouches[0].pageY;
      this.mouse.x = ( ( posX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
      this.mouse.y = - ( ( posY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
      //console.log(this.mouse.x, this.mouse.y);
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects( this.meshes );
    
      if (intersects.length > 0) {   
        this.INTERSECTED = intersects[0].object;
      }
      else{
        if(this.INTERSECTED){
          this.INTERSECTED = null;
        }
      }

    },

    setColor: function(hour){
      for (let i=0; i<this.meshes.length; i++){
        this.meshes[i].geometry.colorsNeedUpdate = true;
        let identifier = this.meshes[i].identifier;
        let color;
  
        if( (this.itis && identifier == 'itis') 
                || (this.clock && identifier == 'clock')
                || (this.past && identifier == 'past')
                || (this.to && identifier == 'to')
                || (this.five && identifier == 'five')
                || (this.ten && identifier == 'ten')
                || (this.quarter && identifier == 'quarter')
                || (this.twenty && identifier == 'twenty') 
                || (this.half && identifier == 'half')

                || ((hour == 1 || hour == 13) && identifier == 'one')
                || ((hour == 2 || hour == 14) && identifier == 'two')
                || ((hour == 3 || hour == 15) && identifier == 'three')
                || ((hour == 4 || hour == 16) && identifier == 'four')
                || ((hour == 5 || hour == 17) && identifier == 'hourFive')
                || ((hour == 6 || hour == 18) && identifier == 'six')
                || ((hour == 7 || hour == 19) && identifier == 'seven')
                || ((hour == 8 || hour == 20) && identifier == 'eight')
                || ((hour == 9 || hour == 21) && identifier == 'nine')
                || ((hour == 10 || hour == 22) && identifier == 'hourTen')
                || ((hour == 11 || hour == 23) && identifier == 'eleven')
                || ((hour == 0 || hour == 12 || hour == 24) && identifier == 'twelve')
              ){
                color = new THREE.Color(.4,.4,.4);
              }
              else{
                color = new THREE.Color(.1,.1,.1);
              }
              this.meshes[i].material.color = color;
      }
    },

    getHour: function(){
      let d = new Date();
      let H = d.getHours();
      let M = d.getMinutes();
      let hour;

      this.past = false;
      this.to = false;
      this.five = false;
      this.ten = false;
      this.quarter = false;
      this.twenty = false;
      this.half = false;
      this.clock = false;

      if (M >= 0 && M < 5){
            this.clock = true;
            hour = H;
        }
		
        if (M >= 5 && M < 10){
            this.five = true;
            this.past = true;
            hour = H;  
        }
        
        if (M >= 10 && M < 15){
            this.ten = true;
            this.past = true;
            hour = H;
        }	
        
        if (M >= 15 && M < 20){
            this.quarter = true;
            this.past = true;
            hour = H; 
        }
        
        if (M >= 20 && M < 25){
            this.twenty = true;
            this.past = true;
            hour = H;
        }
        
        if (M >= 25 && M < 30){
            this.twenty = true;
            this.five = true;
            this.past = true;
            hour = H;
        }
    
        if (M >= 30 && M < 35){
            this.half = true;
            this.past = true;
            hour = H;
        }
        
        if (M >= 35 && M < 40){
            this.twenty = true;
            this.five = true;
            this.to = true;
            hour = H + 1;
        }
        
        if (M >= 40 && M < 45){
            this.twenty = true;
            this.to = true;
            hour = H + 1;
        }
        
        if (M >= 45 && M < 50){
            this.quarter = true;
            this.to = true;
            hour = H + 1;
        }
        
        if (M >= 50 && M < 55){
            this.ten = true;
            this.to = true;
            hour = H + 1;
        }
        
        if (M >= 55 && M <= 59){
            this.five = true;
            this.to = true;
            hour = H + 1;
        }
        return hour;
    },

    onWindowResize:function(){
        this.camera.aspect = this.renderer.domElement.offsetWidth / this.renderer.domElement.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.$refs.threecontainer.clientWidth, this.$refs.threecontainer.clientHeight);
    },
    
    animate: function() {  
        this.now = Date.now();
        this.delta = this.now - this.then;
        if (this.delta > this.interval) {
          this.setColor(this.getHour());
          this.then = this.now - (this.delta % this.interval);
        }
        this.group.rotation.y += 0.0002;
        requestAnimationFrame( ()=>{this.animate()} );
        this.renderer.render( this.scene, this.camera );
    }
  }
}
</script>

<style scoped lang="scss">
  .threecontainer{
      position:absolute;
      width: 100%;
      height: 100%;
      z-index:3;
      overflow:hidden;
      background-color:#111 ;
      background-size: cover;
      background: linear-gradient(to right, rgb(90, 0, 0), rgb(25, 0, 0) 70%);  
  }
  .credits{
    position:absolute;
    z-index:4;
    color:#FFF;
    bottom:30px;
    left:50%;
    transform: translateX(-50%);
    font-size:12px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    a{
      color:#FFF;
      font-size:12px;
      text-decoration: none;
      &:hover{
        color:#CC3300;
      }
    }

    img{
      display:inline-block;
      transform:translateY(2px);
      width:12px;
      height:12px;
    }
  }

  .loader{
    position:absolute;
    z-index:5;
    left:50%;
    top:50%;
    transform: translateX(-50%);
    color:#FFF;
    background-color:rgba(0,0,0,75);
    padding:5px;
    font-size:12px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
