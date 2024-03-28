using System;
class Program
{
    public static void Main(string[] args)
    {
        int choice;
        int height = 0;
        int width = 0;
        // Program loop continues until user chooses to exit
        do
        {
        Console.WriteLine("Select an option:\n" +
            "Triangle Tower press 1\n" +
            "Rectangle Tower press 2\n" +
            "exit press 3\n");
            string userInput =  Console.ReadLine();
            int.TryParse(userInput, out choice);
            switch (choice)
            {
                case 1:
                    widthAndHeight("Rectangle", out height, out width);
                    RectangleTower( height,width);
                    break;
                case 2:
                    widthAndHeight("Triangle", out height, out width);
                    TriangleTower(height, width);
                    break;
                case 3:
                    Console.WriteLine("Exit");
                    break;
                default:
                    Console.WriteLine("Invalid input. try again");
                    break ;
            }
        }
        while (choice != 3);
    }

    static void widthAndHeight(string shape, out int height,out int width)
    {//Function to retrieve the tower's height and width from the user, and check the width integrity
        Console.Write($"Enter height of {shape}: ");
        height = int.Parse(Console.ReadLine());
        width = 0;
        while (width == 0) {
            Console.Write($"Enter width of {shape}: ");
            string input = Console.ReadLine();
            int number;
            bool isNumeric = int.TryParse(input, out number);
            if (isNumeric)
                width = (number > 0) ? number : 0;
            if(width == 0)
            { 
               Console.WriteLine("Invalid input");
            }
        }
    }
    static void RectangleTower(int height, int width)
    {// Function to calculate and print area or perimeter of rectangle tower

        if (height == width || Math.Abs(height - width) > 5)
        {//Print area
            Console.WriteLine("The area of the rectangle is:" + width * height);
        }
        else
        {// print perimeter
            Console.WriteLine("The perimeter of the rectangle is:" + (width * 2 + height * 2));
        }
    }

    static void TriangleTower(int height, int width)
    {// Function to handle Triangle Tower options (perimeter or print)
        Console.WriteLine("Choose option:\n" +
            "Triangle hekef press 1\n" +
            "print Triangle  press 2\n");
        int choice=int.Parse(Console.ReadLine());
        switch (choice)
        {
            case 1:
                double halfWidth=width/2;
                double perimeter = Math.Sqrt(Math.Pow(height, 2) + Math.Pow(halfWidth, 2)) * 2 + width;
                Console.WriteLine("The perimeter of the triangle  " +perimeter.ToString("F2"));
                break;
            case 2:
                PrintTriangle( height,  width);
                break;
            default: Console.WriteLine("invalid input");
                break;
        }
    }

    static void PrintTriangle(int height, int width)
    {//A method that prints the triangle by asterisks according to its size
        if (width % 2== 0 || (height * 2) < width)
        {
            Console.WriteLine("The triangle cannot be printed");
        }
        else
        {
            int numOFGroups = (width / 2) - 1;
            int numInGroup = numOFGroups!=0?(height - 2) / numOFGroups:0;
            int numInFirstGroup = numInGroup + (height - 2) - numInGroup * numOFGroups;
            string row,spaces;
            spaces = new string(' ', width / 2);
            Console.Write(spaces);
            Console.WriteLine('*');

            for (int i = 2; i < height; i++)
            {// Loop through remaining rows of triangle
                if (width == 1 ||width==3)
                {
                    spaces = new string(' ', width / 2 );
                    Console.Write(spaces);
                    Console.WriteLine('*');
                }
                else if (i - 1 <= numInFirstGroup)
                {
                    spaces = new string(' ', width / 2-1);
                    row = new string('*', 3);
                    Console.Write(spaces);
                    Console.WriteLine(row);
                }
                else
                {
                    double groupNumber =( i-numInFirstGroup-2)/numInGroup+1;
                     row = new string('*', ((int)groupNumber+1) * 2+1);
                     spaces=new string(' ', width/2-((int)groupNumber+1));
                    Console.Write(spaces);
                    Console.WriteLine(row);
                }
            }
            row = new string('*', width);
            Console.WriteLine(row);
        }
    }
}


