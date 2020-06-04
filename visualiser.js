
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

    this.speed = 1; //1 step per 1000 microseconds
  }

  setSorter(sorter) {
    this.sorter = sorter;
  }

  playAnim(ts) {
    if(!this.oldtime) {
      this.oldtime = ts;
      this.sorter.step();
      this.showData();
    }
    var elapsed = ts - this.oldtime;
    if(elapsed >= 1000/this.speed) {
      this.sorter.step();

      this.showData();
      this.oldtime = ts;
    }

    if(this.sorter.sorting) {
      window.requestAnimationFrame(this.playAnim.bind(this));
    } else {
      this.showData(); //show data one last time
      this.oldtime = null;
    }
  }

  showData() {
    var sorting = false;
    if(this.sorter.sorting)
      sorting = true;
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
    if(sorting) {
      if(this.sorter.algo == 'bubble') {
        var {i,j} = this.sorter.state;
        
        ctx.fillStyle='#ff0';
        ctx.fillRect((j+1)*w1, hmax, w1, h1*data[j+1]);
        ctx.fillStyle='#0f0';
        ctx.fillRect((j)*w1, hmax, w1, h1*data[j]);
      } else if(this.sorter.algo == 'selection') {
        var {i,j, mini} = this.sorter.state;
        ctx.fillStyle = '#0f0';
        ctx.fillRect(mini*w1, hmax, w1, h1*data[mini]);
        ctx.fillStyle = '#ff0';
        ctx.fillRect(j*w1, hmax, w1, h1*data[j]);
        ctx.fillStyle = '#0ff';
        ctx.fillRect(i*w1, hmax, w1, h1*data[i]);
      }
    }
  }
}
