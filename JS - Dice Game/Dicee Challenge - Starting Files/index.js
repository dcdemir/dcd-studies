var randomnumber1 = Math.floor(Math.random() * 6) +1;
var randomnumber2 = Math.floor(Math.random() * 6) +1;


document.getElementById("img1").setAttribute("src","images/dice" + randomnumber1 + ".png");
document.getElementById("img2").setAttribute("src","images/dice" + randomnumber2 + ".png");

/*if (randomnumber1 == 1)
{
    document.getElementById("img1").setAttribute("src","images/dice1.png");
}
else if (randomnumber1 == 2)
{
    document.getElementById("img1").setAttribute("src","images/dice2.png");
}
else if (randomnumber1 == 3)
{
    document.getElementById("img1").setAttribute("src","images/dice3.png");
}
else if (randomnumber1 == 4)
{
    document.getElementById("img1").setAttribute("src","images/dice4.png");
}
else if (randomnumber1 == 5)
{
    document.getElementById("img1").setAttribute("src","images/dice5.png");
}
else if (randomnumber1 == 6)
{
    document.getElementById("img1").setAttribute("src","images/dice6.png");
}

if (randomnumber2 == 1)
{
    document.getElementById("img2").setAttribute("src","images/dice1.png");
}
else if (randomnumber2 == 2)
{
    document.getElementById("img2").setAttribute("src","images/dice2.png");
}
else if (randomnumber2 == 3)
{
    document.getElementById("img2").setAttribute("src","images/dice3.png");
}
else if (randomnumber2 == 4)
{
    document.getElementById("img2").setAttribute("src","images/dice4.png");
}
else if (randomnumber2 == 5)
{
    document.getElementById("img2").setAttribute("src","images/dice5.png");
}
else if (randomnumber2 == 6)
{
    document.getElementById("img2").setAttribute("src","images/dice6.png");
}*/


if (randomnumber1 > randomnumber2) 
{
    document.getElementById("result").innerHTML = "Player 1 Wins!"; 
}
else if (randomnumber2 > randomnumber1)
{
    document.getElementById("result").innerHTML = "Player 2 Wins!"; 
}
else if (randomnumber1 == randomnumber2) 
{
    document.getElementById("result").innerHTML = "Draw!"; 
}
