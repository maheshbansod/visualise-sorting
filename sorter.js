
class Sorter {
  constructor(algo, data) {
    this.data = data;
    this.algo = algo;
    this.setStep();
  }

  setData(data) {
    this.data = data;
  }

  setAlgorithm(algo) {
    this.algo = algo;
    this.setStep();
  }

  setStep() {
    if(this.algo == 'bubble')
      this.step = this.bubbleStep;
    else if(this.algo == 'selection')
      this.step = this.selectionStep;
  }

  selectionStep() {
    this.sorting = true;

    if(!this.state) {
      this.state = {};
      this.state.i = this.state.swaps = 0;
      this.state.j = 1;
      this.state.min = this.data[0];
      this.state.mini = 0; //index of minimum
    }

    var j = this.state.j;

    if(this.data[j] < this.state.min) {
      this.state.min = this.data[j];
      this.state.mini = j;
    }
    
    this.state.j++;
    if(this.state.j >= this.data.length) {
      if(this.state.i != this.state.mini) {
        this.swap(this.state.i, this.state.mini);
        this.state.swaps++;
      }
      this.state.i++;
      if(this.state.i >= this.data.length) {
        this.state = null;
        this.sorting = false;
      } else {
        this.state.j = this.state.i+1;
        this.state.mini = this.state.i;
        this.state.min = this.data[this.state.i];
      }
    }
  }

  bubbleStep() {

    this.sorting = true;

    if(!this.state) {
      this.state = {}
      this.state.i = this.state.j = this.state.swaps = 0;
    }
    var state = this.state;
    
    if(this.data[this.state.j] > this.data[this.state.j+1]) {
      this.swap(this.state.j, this.state.j+1);
      this.state.swaps++;
    }

    this.state.j++;
    if(this.state.j >= this.data.length-this.state.i) {
      this.state.j = 0;
      this.state.i++;
      if(this.state.i >= this.data.length || this.state.swaps == 0) {
        this.sorting = false;
        this.state = null;
        this.animStartTime = null;
      } else this.state.swaps = 0;
    }
    return state;
  }

  swap(i1, i2) {
    var t = this.data[i1];
    this.data[i1] = this.data[i2];
    this.data[i2] = t;
  }
}
