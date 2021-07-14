class Bounce{
	constructor(
		el,
	){
		this.el = el;
		this.width = this.width.bind(this);
		this.height = this.height.bind(this);
		this.bounce = this.bounce.bind(this);
	}

	width(wd){
		this.el.style.width = wd;
		return this;
	}

	height(ht){
		this.el.style.height = ht;
		return this;
	}

	bounce(ms, counter, dy, dx, press){
		if(!this.bounce_started){
			this.bouncing = {
				press: press,
			};
			this.bounce_started = true;
			this.bouncing.quan = counter;
			this.bouncing.dy = dy;
			this.bouncing.dx = dx;
		}else if(counter === -1){
			this.bounce_started = false;
		}else{
			this.bouncing.press += (1 - this.bouncing.press) / (counter + 1);
		}
		// bounce down
		let dec = (1.4 - this.bouncing.press);
		this.el.style.transition = 'all ' + (ms * dec).toString() + 'ms ease-in';
		this.el.style.transform = 'scaleY(' + this.bouncing.press.toString() + ') translate(' + (this.bouncing.dx / this.bouncing.quan * (this.bouncing.quan - counter + 1)).toString() + 'px, ' + (this.bouncing.dy / this.bouncing.press).toString() + 'px)';
		if(!this.bounce_started){
			// free up and exit animation
			this.bouncing = null;
			return;
		};
		setTimeout(()=>{
			// bounce up
			this.el.style.transition = 'all ' + (ms * dec).toString() + 'ms ease-out';
			this.el.style.transform = 'scaleY(1) translate(' + (this.bouncing.dx / this.bouncing.quan * (this.bouncing.quan - counter + 1)).toString() + 'px, ' + (this.bouncing.dy - this.bouncing.dy * dec).toString() + 'px)';
			setTimeout(()=>{
				this.bounce(ms, counter - 1);
			}, ms * dec);
		}, ms * dec);
	}
}
