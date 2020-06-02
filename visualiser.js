
class Visualiser {

  /**
  * @param WebGL2dContext ctx
  * @param string dtype type of chart to use for data - bar,jcurve, etc
  * 
  *
  */
  constructor(ctx, dtype) {
    this.ctx = ctx;
    this.dtype = dtype;
  }

  setSorter(sorter) {
    this.sorter = sorter;
  }

  playAnim(ts) {
    if(!this.animstartt) {
      this.animstartt = ts;
      this.sorter.step();
      this.showData();
    }
    var elapsed = ts - this.animstartt;
    if(elapsed >= 100) {
      this.sorter.step();

      this.showData();
    }

    if(this.sorter.sorting) {
      window.requestAnimationFrame(this.playAnim.bind(this));
    }
  }

  showData() {
    var ctx = this.ctx;

    var n = this.sorter.data.length;
    var data = this.sorter.data;
    var width = ctx.canvas.width;
    var w1 = width/n; //width for 1 element
    var hmax = ctx.canvas.height/3;
    var h1 = hmax/Math.max(...data);

    ctx.clearRect(0,0,width, ctx.canvas.height);

    ctx.fillStyle='#d72';
    for(var i=0;i<n;i++) {
      ctx.fillRect(i*w1, hmax, w1, h1*data[i]);
    }
  }
}
