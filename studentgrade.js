/*
*ASSIGNMENT 1
*ATUGONZA DIANA GLORIA
*REGISTRATION NUMBER : M25B13/007
*ACCESS NUMBER : B33214
*PROBLEM: Student Grade Managment system
* I chose to solve the problem of manual grade calculation and performance tracking
* For students. This system helps students calculate their GPA and track performance
*across multiple courses, and get personalised feedback on their grades.
*This addresses a real need in academic environments where students need to
*regularly monitor their academic progress and make informed decisions about their studies.
*/

//Student Grade Managment system
function studentGradeManager(){
    //Array to store course information
    let courses = [];
    let totalCreditUnits = 0;
    let totalGradePoints = 0;

    console.log("===STUDENT GRADE MANAGEMENT SYSTEM===");
    console.log("Welcome! Let's calculate your semester performance.\n");

    // FUNCTION : add course grades
    // I used this function to encapsulate the logic for adding individual courses
    //This makes the code modular and reusable
    function
    addCourse(courseName,
        creditUnits, score){
let grade ='';
let gradePoint =0;
let remark ='';
// CONDITIONAL LOGIC
//Determine grade based on score 
// I used if-else if statements beacuse we have multiple distinct ranges
//This is more readable than a switch for numerical ranges

if (score>=80){
    grade = 'A';
    gradePoint = 5;
    remark = 'Excellent';
}else if (score >= 75){
    grade='B+';
    gradePoint=4.5;
    remark='Very Good';
}else if (score>= 70){
    grade='B';
    gradePoint=4;
    remark='Good';
}else if (score>=65){
    grade ='C+';
    gradePoint=3.5;
    remark= 'Above Average';
}else if (score >=60){
    grade='C';
    gradePoint=3;
    remark='Average';
}else if (score>-55){
    grade='D+';
    gradePoint=2.5;
    remark='Pass';
}else if (score>=50){
    grade='D';
    gradePoint=2;
    remark='Marginal Pass';
}else{
    grade='F';
    gradePoint=0;
    remark='Fail';
}
const course ={
    name: courseName,
    credits: creditUnits,
    score:score,
    grade:grade,
    gradePoint:gradePoint,
    remark:remark,
    points:creditUnits * gradePoint
};
courses.push(course);
return course;
        }
        }
        //FUNCTION : Calculate overall GPA
        //This function handles the GPA calculation separately for better organisation
        function calculateGPA(){
            if(totalCreditUnits === 0)return totalGradePoints/totalGradeUnits;
        }

        //Funtion: Generate Performance report
        // This function creates a comprehensive report using loops
        function generateReport(){
            console.log("\n===ACADEMIC PERFOMANCE REPORT===");
            //LOOP : iterate through all courses
            // I used a for loop because we know  exactly how many times to iterate
            //(through all courses in the array)
            for (let i=0;i<courses.length;i++){
                const courses = course[i]
                console.log('${i+1}. ${course.name}');
                console.log('Credits:${course.credits}|Score:${course.score}%');
                console.log('Grade:${course.grade}(${course.remark})');
                console.log('Grade Points:${course.points.toFixed(2)}\n');
                  
        // CONDITIONAL: Provide performance feedback
        // Switch statement is suitable here as we have discrete GPA ranges
        let performance = '';
        if (gpa >= 4.5) {
            performance = 'First Class Honors! Outstanding performance!';
        } else if (gpa >= 4.0) {
            performance = 'Second Class Upper Division! Excellent work!';
        } else if (gpa >= 3.5) {
            performance = 'Second Class Lower Division! Good performance!';
        } else if (gpa >= 3.0) {
            performance = 'Pass. Keep working hard!';
        } else if (gpa >= 2.0) {
            performance = 'Pass. Consider seeking academic advice.';
        } else {
            performance = 'Academic warning! Please meet with your advisor.';
        }
        
        console.log(`PERFORMANCE: ${performance}`);
    }
    
    // FUNCTION: Input validation
    // This ensures data integrity by validating user input
    function isValidInput(score, credits) {
        return score >= 0 && score <= 100 && credits > 0;
    }
    
    // MAIN PROGRAM LOGIC
    let continueAdding = true;
    let courseCount = 0;
    
    // LOOP: Continue adding courses until user stops
    // I used a while loop because we don't know how many courses the user will add
    // This provides flexibility for different numbers of courses
    while (continueAdding) {
        courseCount++;
        
        // Simulating user input for demonstration
        // In a real application, this would come from form inputs
        const sampleCourses = [
            { name: "Programming Fundamentals", credits: 3, score: 85 },
            { name: "Database Systems", credits: 3, score: 72 },
            { name: "Web Development", credits: 4, score: 78 },
            { name: "Mathematics for IT", credits: 3, score: 65 }
        ];
        
        let courseData;
        if (courseCount <= sampleCourses.length) {
            courseData = sampleCourses[courseCount - 1];
        } else {
            // For demonstration beyond sample data
            courseData = { 
                name: `Elective ${courseCount - sampleCourses.length}`, 
                credits: 2, 
                score: Math.floor(Math.random() * 40) + 50 
            };
        }
        
        const { name, credits, score } = courseData;
        
        if (isValidInput(score, credits)) {
            const course = addCourse(name, credits, score);
            totalCreditUnits += credits;
            totalGradePoints += course.points;
            
            console.log(`Added: ${name} - ${score}% (Grade: ${course.grade})`);
        } else {
            console.log(`Invalid input for ${name}. Skipping...`);
        }
        
        // Stop after 6 courses for demonstration
        if (courseCount >= 6) {
            continueAdding = false;
        }
    }
    
    // Generate final report
    generateReport();
    
    // FUNCTION: Find best and worst performing courses
    // This demonstrates additional analysis capabilities
    function analyzePerformance() {
        if (courses.length === 0) return;
        
        let bestCourse = courses[0];
        let worstCourse = courses[0];
        
        // LOOP: Find extremes in performance
        // Using for...of loop for cleaner syntax when we don't need the index
        for (const course of courses) {
            if (course.score > bestCourse.score) {
                bestCourse = course;
            }
            if (course.score < worstCourse.score) {
                worstCourse = course;
            }
        }
        
        console.log("\n=== PERFORMANCE ANALYSIS ===");
        console.log(`Best Course: ${bestCourse.name} (${bestCourse.score}%)`);
        console.log(`Worst Course: ${worstCourse.name} (${worstCourse.score}%)`);
        
        // CONDITIONAL: Provide study recommendations
        if (worstCourse.score < 50) {
            console.log("RECOMMENDATION: Focus on improving your performance in failing courses.");
        } else if (worstCourse.score < 60) {
            console.log("RECOMMENDATION: Consider getting tutoring for your weaker subjects.");
        } else {
            console.log("RECOMMENDATION: Maintain your current study habits!");
        }
    }
    
    analyzePerformance();
}

// Execute the grade management system
studentGradeManager();

console.log('The End');


