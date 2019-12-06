jQuery(function($) {
    var svgSpinner  = function(element, deg=270 ){
        this.element = element;
        this.circle = this.element.find('.circle-1');
        this.selector = this.element.find('.circle-2');
        this.deg = deg;
        this.isDragging = false;
        this.init();
        this.spin();
        this.eventBinder();
    }
    svgSpinner.prototype.init = function(){
        this.radius = this.circle.attr('r') - 10;
        this.cx = +this.circle.attr('cx');
        this.cy = +this.circle.attr('cy');
    }

    svgSpinner.prototype.spin = function(){
      var t = Math.tan(this.deg / 360 * Math.PI);
      var px = this.radius * (1 - t ** 2) / (1 + t ** 2) + this.cx;
      var py = this.radius * 2 * t / (1 + t ** 2) + this.cy;
      this.selector.attr('cx', px);
      this.selector.attr('cy', py);
    }
    svgSpinner.prototype.eventBinder = function(){
        $(this.selector).on('mousedown', this.dragStart.bind(this) )
        $(document).on('mouseup', this.dragEnd.bind(this) )
    }
    svgSpinner.prototype.spinning = function(event){
            event.preventDefault();
            if( this.isDragging === false )
                return;
            var e = {
                cx: event.pageX - this.radius - this.circle.offset().left,
                cy: -(event.pageY - this.radius - this.circle.offset().top)
            },
            cord = {
                x: e.cx >= 0 ? 'right' : 'left',
                y: e.cy >= 0 ? 'top' : 'bottom'
            }

            var degree;
            if(cord.x=='right' && cord.y == 'top'){
                degree = -(Math.atan(e.cy / e.cx) * (180 / Math.PI));
            }else if(cord.x=='right' && cord.y=='bottom'){
                degree = -(Math.atan(e.cy / e.cx) * (180 / Math.PI));
            }else if(cord.x=='left' && cord.y=='bottom'){
                degree = -(Math.atan(e.cy / e.cx) * (180 / Math.PI) - 180);
            }else if(cord.x=='left' && cord.y=='top'){
                degree = -(Math.atan(e.cy / e.cx) * (180 / Math.PI) - 180);
            }
            this.deg = Math.round(degree)
            this.spin();
    }
    svgSpinner.prototype.dragStart = function(event){
        this.element.css({'cursor': 'all-scroll'});
        this.isDragging = true;
        $(document).on('mousemove', this.spinning.bind(this) )
    }
    svgSpinner.prototype.dragEnd = function(event){
        this.element.css({'cursor': 'auto'});
        if(this.isDragging){ 
            this.isDragging = false;
        }
    }
  
    $('[data-svg-spinner]').each(function(){
        new svgSpinner($(this));
    });


});
    
    