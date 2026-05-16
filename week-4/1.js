class Shape {
    constructor(color,depth){
        this.color = color;
        this.depth = depth;
    }

     paint(){
        console.log("We are painting using " + this.color +"color");
        
    }
    volume(){
        return this.area() * this.depth
    }
}


class Rectangle extends Shape{
    constructor(height,width,color){
        super(color);
        this.height = height;
        this.width = width;
    }

    area(){
        return this.width * this.height
    }

    peri(){
        return 2*(this.width + this.height)
    }

    
}

class Circle extends Shape{
    constructor(radius,depth,color){
        super(color,depth)
        this.radius = radius;
    }

    area(){
        return 3.1415* (this.radius) * (this.radius)
    }

    peri(){
        return 2*3.1415*(this.radius)
    }

    
}

class Square extends Shape{

    constructor(side,color){
        super(color);
        this.side = side;
    }

    area(){
        return this.side * this.side
    }

    peri(){
        return 4*this.side
    }

    
}




const c1 = new Circle(15,10, "green")
console.log(c1.paint());
//  this gives undefined after the the text line because we first log it but don't return any value
// c1.paint()
 // this gives only desired values as we only call the function and it log the text line. 
console.log(c1.volume())