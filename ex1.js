const chars = {

    '1': 'e',

    '8': 'r',

    '11': '!',

    '4': 'o',

    '0': 'H',

    '10': 'd',

    '6': 'W',

    '9': 'l',

    '2': 'l',

    '7': 'o',

    '3': 'l',

    length: 12

}

let msg = ''

for(let i = 0; i < chars.length; i++) {

    if (chars[i])

        msg = msg + chars[i]

    else

        msg = msg + ' '

}

console.log(msg)

const createPoint = (x, y) => {
    return {
        x,
        y,
        getX: function() { return this.x; },
        getY: function() { return this.y; },
        moveTo: function(newX, newY) { this.x = newX; this.y = newY; },
        toString: function() { return `Point(${this.x}, ${this.y})`; }
    };
};

const createCircle = ({  x, y, radius, center }) => {
    if (!center) {
        center = createPoint(x, y);
    }
    return {
        center,
        radius,
        getCenterX: function() { return this.center.getX(); },
        getCenterY: function() { return this.center.getY(); },
        getRadius: function() { return this.radius; },
        moveCenterTo: function(newX, newY) { this.center.moveTo(newX, newY); },
        toString: function() {
            return `Circle(center: ${this.center.toString()}, radius: ${this.radius})`;
        }
    };
};


// 使用中心点对象和半径
const circle1 = createCircle({ center: createPoint(7, 8), radius: 20 });

// 使用x, y坐标和半径
const circle2 = createCircle({ x: 7, y: 8, radius: 12 });

const circleArray = [
    createCircle({ center: createPoint(7, 8), radius: 20 }),
    createCircle({ x: 7, y: 8, radius: 12 }),
];

const radiusArray = circleArray.map(circle => circle.getRadius());
console.log(radiusArray);

console.log(circle1.getRadius());
console.log(circle2.getRadius());

// Person工厂函数
const createPerson = ({ name, age }) => {
    const sayName = () => console.log(`Name: ${name}`);
    const sayAge = () => console.log(`Age: ${age}`);

    return {
        name,
        age,
        sayName,
        sayAge,
        toString: () => `Person: ${name}, ${age}`,
        equals: (otherPerson) => name === otherPerson.name && age === otherPerson.age
    };
};

// Employee工厂函数，使用spread语法继承Person
const createEmployee = ({ name, age, salary }) => {
    const person = createPerson({ name, age });
    const saySalary = () => console.log(`Salary: ${salary}`);

    return {
        ...person,
        salary,
        saySalary,
        toString: () => `${person.toString()}, Salary: ${salary}`,
        equals: (otherEmployee) => person.equals(otherEmployee) && salary === otherEmployee.salary
    };
};

// 使用示例
const employee1 = createEmployee({ name: 'Alice', age: 30, salary: 50000 });
employee1.sayName();
employee1.saySalary();
console.log("////")


// Person构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayName = function() { console.log(`Name: ${this.name}`); };
Person.prototype.sayAge = function() { console.log(`Age: ${this.age}`); };
Person.prototype.toString = function() { return `Person: ${this.name}, ${this.age}`; };
Person.prototype.equals = function(otherPerson) {
    return this.name === otherPerson.name && this.age === otherPerson.age;
};

// Employee构造函数
function Employee(name, age, salary) {
    Person.call(this, name, age);
    this.salary = salary;
}

// 设置Employee的原型为Person的实例
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// 在Employee原型上添加方法
Employee.prototype.saySalary = function() { console.log(`Salary: ${this.salary}`); };
Employee.prototype.toString = function() { return `${Person.prototype.toString.call(this)}, Salary: ${this.salary}`; };
Employee.prototype.equals = function(otherEmployee) {
    return Person.prototype.equals.call(this, otherEmployee) && this.salary === otherEmployee.salary;
};

// 使用示例
const employee3 = new Employee('Chen', 22, 20000);
const employee2 = new Employee('Bob', 28, 60000);
employee2.sayName();
employee2.saySalary();
employee2.sayAge();
console.log(employee2.toString());
console.log(employee3.toString());
console.log("////")
console.log(employee2.equals(employee3))
employee2.sayName();
employee2.saySalary();
employee2.sayAge();
employee3.sayName();
employee3.saySalary();
employee3.sayAge();




