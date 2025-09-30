javascript
/*
 * 
 * Student: [ATUGONZA DIANA GLORIA]
 * Access Number: [B33214]
 * Registration Number: [M25B13/007]
 * 
 * PROBLEM: Hostel Management System
 * 
 * I chose to solve the problem of hostel management in educational institutions
 * where there's need to manage room bookings, student information, payment tracking,
 * and balance calculations. This system handles room allocation, student records,
 * payment processing, and generates various reports for hostel administration.
 * 
 * This addresses real challenges in student accommodation management including
 * room availability tracking, payment reminders, and occupancy reporting.
 */

// Hostel Management System
function hostelManagementSystem() {
    // Arrays to store system data
    let rooms = [];
    let students = [];
    let bookings = [];
    let payments = [];
    
    console.log("=== HOSTEL MANAGEMENT SYSTEM ===");
    console.log("Welcome to Dean Courts Hostel Administration Portal!\n");
    
    // FUNCTION: Initialize sample data
    // I used this function to pre-populate the system with sample data
    // This demonstrates the system functionality without manual data entry
    function initializeSampleData() {
        console.log("Initializing sample data...\n");
        
        // Create sample rooms
        const roomTypes = ['Single', 'Double', 'Shared', 'Suite'];
        
        // LOOP: Create multiple rooms of different types
        // Using for loop with conditional room type assignment
        for (let i = 1; i <= 20; i++) {
            let roomType = '';
            let capacity = 0;
            let price = 0;
            
            // CONDITIONAL: Assign room properties based on room number pattern
            if (i <= 5) {
                roomType = 'Single';
                capacity = 1;
                price = 800000; // UGX per semester
            } else if (i <= 12) {
                roomType = 'Double';
                capacity = 2;
                price = 500000;
            } else if (i <= 18) {
                roomType = 'Shared';
                capacity = 4;
                price = 300000;
            } else {
                roomType = 'Suite';
                capacity = 2;
                price = 1200000;
            }
            
            const room = {
                roomNumber: `R${i.toString().padStart(3, '0')}`,
                type: roomType,
                capacity: capacity,
                currentOccupants: 0,
                price: price,
                isAvailable: true,
                block: i <= 10 ? 'A' : 'B'
            };
            
            rooms.push(room);
        }
        
        // Create sample students
        const sampleStudents = [
            { name: "Alice Kityo", regNumber: "M24B13/007", course: "Computer Science", year: 2 },
            { name: "Bob Tibaleka", regNumber: "M25B13/115", course: "Business Admin", year: 1 },
            { name: "Carol Agonza", regNumber: "M23B13/20", course: "Engineering", year: 3 },
            { name: "David Mugisha", regNumber: "M24B15/001", course: "Medicine", year: 2 },
            { name: "Eva Nabagala", regNumber: "M25B22/003", course: "Law", year: 1 }
        ];
        
        for (const studentData of sampleStudents) {
            registerStudent(studentData.name, studentData.regNumber, studentData.course, studentData.year);
        }
        
        console.log("Sample data initialized successfully");
    }
    
    // FUNCTION: Register new student
    // Handles student registration with validation
    function registerStudent(name, registrationNumber, course, yearOfStudy) {
        // CONDITIONAL: Validate student information
        if (!name || !registrationNumber || !course || !yearOfStudy) {
            console.log("Error: All student details are required");
            return null;
        }
        
        // Check if student already exists
        const existingStudent = students.find(s => s.registrationNumber === registrationNumber);
        if (existingStudent) {
            console.log(`Error: Student with registration number ${registrationNumber} already exists`);
            return existingStudent;
        }
        
        const student = {
            id: students.length + 1,
            name: name,
            registrationNumber: registrationNumber,
            course: course,
            yearOfStudy: yearOfStudy,
            roomNumber: null,
            dateRegistered: new Date().toLocaleDateString(),
            isActive: true
        };
        
        students.push(student);
        console.log(` Student registered: ${name} (${registrationNumber})`);
        
        return student;
    }
    
    // FUNCTION: Book room for student
    // Handles room allocation with availability checks
    function bookRoom(registrationNumber, preferredRoomType = 'Any') {
        const student = students.find(s => s.registrationNumber === registrationNumber && s.isActive);
        
        // CONDITIONAL: Validate student eligibility
        if (!student) {
            console.log("Error: Student not found or inactive");
            return false;
        }
        
        if (student.roomNumber) {
            console.log(`Error: Student already has room ${student.roomNumber}`);
            return false;
        }
        
        let availableRoom = null;
        
        // LOOP: Find available room matching preferences
        // Using for loop to search for suitable room
        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i];
            
            if (room.isAvailable && room.currentOccupants < room.capacity) {
                if (preferredRoomType === 'Any' || room.type === preferredRoomType) {
                    availableRoom = room;
                    break;
                }
            }
        }
        
        // CONDITIONAL: Handle room allocation or waitlist
        if (!availableRoom) {
            console.log(` No ${preferredRoomType} rooms available. Student added to waitlist.`);
            // In a real system, you'd add to waitlist here
            return false;
        }
        
        // Allocate room
        availableRoom.currentOccupants++;
        if (availableRoom.currentOccupants >= availableRoom.capacity) {
            availableRoom.isAvailable = false;
        }
        
        student.roomNumber = availableRoom.roomNumber;
        
        const booking = {
            id: bookings.length + 1,
            studentRegNumber: registrationNumber,
            roomNumber: availableRoom.roomNumber,
            bookingDate: new Date().toLocaleDateString(),
            semester: 'First Semester 2024',
            status: 'Active',
            totalAmount: availableRoom.price,
            amountPaid: 0,
            balance: availableRoom.price
        };
        
        bookings.push(booking);
        
        console.log(` Room booked successfully!`);
        console.log(`   Student: ${student.name}`);
        console.log(`   Room: ${availableRoom.roomNumber} (${availableRoom.type})`);
        console.log(`   Semester Fee: UGX ${availableRoom.price.toLocaleString()}`);
        
        return booking;
    }
    
    // FUNCTION: Process payment
    // Handles payment recording and balance calculation
    function processPayment(registrationNumber, amount, paymentMethod = 'Cash') {
        const booking = bookings.find(b => b.studentRegNumber === registrationNumber && b.status === 'Active');
        
        // CONDITIONAL: Validate payment parameters
        if (!booking) {
            console.log("Error: No active booking found for student");
            return false;
        }
        
        if (amount <= 0) {
            console.log("Error: Payment amount must be positive");
            return false;
        }
        
        if (booking.amountPaid >= booking.totalAmount) {
            console.log("Error: Fees already fully paid");
            return false;
        }
        
        // Process payment
        booking.amountPaid += amount;
        booking.balance = booking.totalAmount - booking.amountPaid;
        
        const payment = {
            id: payments.length + 1,
            bookingId: booking.id,
            studentRegNumber: registrationNumber,
            amount: amount,
            paymentMethod: paymentMethod,
            paymentDate: new Date().toLocaleString(),
            receiptNumber: `RCP${payments.length + 1}`.padStart(8, '0')
        };
        
        payments.push(payment);
        
        console.log(` Payment processed successfully!`);
        console.log(`   Receipt: ${payment.receiptNumber}`);
        console.log(`   Amount: UGX ${amount.toLocaleString()}`);
        console.log(`   Method: ${paymentMethod}`);
        console.log(`   New Balance: UGX ${booking.balance.toLocaleString()}`);
        
        // CONDITIONAL: Check if fully paid
        if (booking.balance <= 0) {
            console.log("🎉 All fees fully paid! Thank you.");
        }
        
        return payment;
    }
    
    // FUNCTION: Generate student report
    // Provides comprehensive student information
    function generateStudentReport(registrationNumber) {
        const student = students.find(s => s.registrationNumber === registrationNumber);
        
        if (!student) {
            console.log("Error: Student not found");
            return;
        }
        
        const booking = bookings.find(b => b.studentRegNumber === registrationNumber);
        const studentPayments = payments.filter(p => p.studentRegNumber === registrationNumber);
        
        console.log(`\n=== STUDENT REPORT: ${student.name} ===`);
        console.log(`Registration: ${student.registrationNumber}`);
        console.log(`Course: ${student.course} | Year: ${student.yearOfStudy}`);
        console.log(`Room: ${student.roomNumber || 'Not allocated'}`);
        console.log(`Status: ${student.isActive ? 'Active' : 'Inactive'}\n`);
        
        if (booking) {
            console.log("BOOKING INFORMATION:");
            console.log(`Room: ${booking.roomNumber}`);
            console.log(`Semester: ${booking.semester}`);
            console.log(`Total Fee: UGX ${booking.totalAmount.toLocaleString()}`);
            console.log(`Amount Paid: UGX ${booking.amountPaid.toLocaleString()}`);
            console.log(`Balance: UGX ${booking.balance.toLocaleString()}`);
            console.log(`Booking Status: ${booking.status}\n`);
        }
        
        if (studentPayments.length > 0) {
            console.log("PAYMENT HISTORY:");
            console.log("Date       | Receipt    | Amount    | Method");
            console.log("-----------|------------|-----------|----------");
            
            // LOOP: Display payment history
            for (const payment of studentPayments) {
                console.log(`${payment.paymentDate.slice(0,10)} | ${payment.receiptNumber} | UGX ${payment.amount.toLocaleString().padEnd(8)} | ${payment.paymentMethod}`);
            }
        } else {
            console.log("No payment history found");
        }
    }
    
    // FUNCTION: Check room availability
    // Shows available rooms by type
    function checkRoomAvailability(roomType = 'All') {
        console.log(`\n=== ROOM AVAILABILITY: ${roomType === 'All' ? 'ALL TYPES' : roomType} ===`);
        
        let availableCount = 0;
        
        // LOOP: Count and display available rooms
        for (const room of rooms) {
            const isMatch = roomType === 'All' || room.type === roomType;
            
            if (room.isAvailable && isMatch) {
                availableCount++;
                const availableSpots = room.capacity - room.currentOccupants;
                console.log(`Room ${room.roomNumber}: ${room.type} - ${availableSpots}/${room.capacity} spots - UGX ${room.price.toLocaleString()}`);
            }
        }
        
        if (availableCount === 0) {
            console.log(`No ${roomType} rooms available currently`);
        } else {
            console.log(`\nTotal available: ${availableCount} rooms`);
        }
        
        return availableCount;
    }
    
    // FUNCTION: Generate financial report
    // Provides hostel financial overview
    function generateFinancialReport() {
        console.log("\n=== FINANCIAL REPORT ===");
        
        let totalExpected = 0;
        let totalCollected = 0;
        let totalBalance = 0;
        let occupiedRooms = 0;
        
        // LOOP: Calculate financial metrics
        for (const booking of bookings) {
            if (booking.status === 'Active') {
                totalExpected += booking.totalAmount;
                totalCollected += booking.amountPaid;
                totalBalance += booking.balance;
                occupiedRooms++;
            }
        }
        
        console.log(`Occupied Rooms: ${occupiedRooms}/${rooms.length}`);
        console.log(`Total Expected Revenue: UGX ${totalExpected.toLocaleString()}`);
        console.log(`Total Collected: UGX ${totalCollected.toLocaleString()}`);
        console.log(`Total Outstanding Balance: UGX ${totalBalance.toLocaleString()}`);
        console.log(`Collection Rate: ${((totalCollected / totalExpected) * 100).toFixed(1)}%`);
        
        // CONDITIONAL: Provide financial insights
        console.log("\nFINANCIAL INSIGHTS:");
        if (totalBalance > totalCollected) {
            console.log(" High outstanding balances - consider sending payment reminders");
        }
        
        if (occupiedRooms < rooms.length * 0.5) {
            console.log(" Low occupancy rate - consider promotional offers");
        }
        
        const averageCollection = totalCollected / (occupiedRooms || 1);
        if (averageCollection < 500000) {
            console.log(" Average collection per room is below target");
        }
    }
    
    // FUNCTION: Send payment reminders
    // Identifies students with outstanding balances
    function sendPaymentReminders() {
        console.log("\n=== PAYMENT REMINDERS ===");
        
        let reminderCount = 0;
        const currentDate = new Date();
        
        // LOOP: Check all active bookings for outstanding balances
        for (const booking of bookings) {
            if (booking.status === 'Active' && booking.balance > 0) {
                const student = students.find(s => s.registrationNumber === booking.studentRegNumber);
                
                if (student) {
                    reminderCount++;
                    console.log(`Reminder sent to: ${student.name}`);
                    console.log(`   Room: ${booking.roomNumber} | Balance: UGX ${booking.balance.toLocaleString()}`);
                    console.log(`   Contact: ${student.registrationNumber}@students.ucu.ac.ug\n`);
                }
            }
        }
        
        if (reminderCount === 0) {
            console.log("No payment reminders needed - all fees are paid!");
        } else {
            console.log(`Total reminders sent: ${reminderCount}`);
        }
    }
    
    // FUNCTION: Vacate room
    // Handles room vacation and student checkout
    function vacateRoom(registrationNumber) {
        const student = students.find(s => s.registrationNumber === registrationNumber);
        const booking = bookings.find(b => b.studentRegNumber === registrationNumber && b.status === 'Active');
        
        // CONDITIONAL: Validate vacation request
        if (!student || !booking) {
            console.log("Error: No active booking found for student");
            return false;
        }
        
        if (booking.balance > 0) {
            console.log(`Error: Outstanding balance of UGX ${booking.balance.toLocaleString()}. Clear balance before vacating.`);
            return false;
        }
        
        // Free up the room
        const room = rooms.find(r => r.roomNumber === booking.roomNumber);
        if (room) {
            room.currentOccupants--;
            if (room.currentOccupants < room.capacity) {
                room.isAvailable = true;
            }
        }
        
        // Update records
        student.roomNumber = null;
        booking.status = 'Completed';
        booking.vacatedDate = new Date().toLocaleDateString();
        
        console.log(` Room vacation processed successfully!`);
        console.log(`   Student: ${student.name}`);
        console.log(`   Room ${room.roomNumber} is now available`);
        console.log(`   Check-out date: ${booking.vacatedDate}`);
        
        return true;
    }
    
    // DEMONSTRATION OF HOSTEL MANAGEMENT SYSTEM
    console.log("Starting Dean Courts Hostel Management System...\n");
    
    // Initialize with sample data
    initializeSampleData();
    
    console.log("\n--- Room Availability Check ---");
    checkRoomAvailability('All');
    
    console.log("\n--- Student Registration and Room Booking ---");
    
    // Register new students and book rooms
    registerStudent("Frank Aine", "M25B13/002", "Education", 1);
    registerStudent("Diana Agondeze", "M25B13/002", "Nursing", 2);
    
    // Book rooms for students
    bookRoom("M25B13/001", "Single");
    bookRoom("M25B13/002", "Double");
    bookRoom("M25B13/003", "Shared");
    bookRoom("M25B13/004", "Shared");
    bookRoom("M25B13/005", "Double");
    bookRoom("M25B13/006", "Single");
    
    console.log("\n--- Payment Processing ---");
    
    // Process various payments
    processPayment("M25B13/002", 400000, "Mobile Money");
    processPayment("M25B13/001", 400000, "Bank Transfer");
    processPayment("M25B13/006", 300000, "Cash");
    processPayment("M25B13/004", 150000, "Mobile Money");
    processPayment("M25B13/003", 500000, "Bank Transfer"); // Full payment
    
    console.log("\n--- Student Reports ---");
    generateStudentReport("M25B13/002");
    generateStudentReport("M25B13/006");
    
    console.log("\n--- Financial Overview ---");
    generateFinancialReport();
    
    console.log("\n--- Payment Reminders ---");
    sendPaymentReminders();
    
    console.log("\n--- Room Vacation ---");
    vacateRoom("M25B13/005");
    
    console.log("\n--- Final Room Availability ---");
    checkRoomAvailability('All');
    
    console.log("\n=== SYSTEM SUMMARY ===");
    console.log(`Total Students: ${students.length}`);
    console.log(`Total Rooms: ${rooms.length}`);
    console.log(`Active Bookings: ${bookings.filter(b => b.status === 'Active').length}`);
    console.log(`Total Payments Processed: ${payments.length}`);
    console.log(`Total Revenue: UGX ${payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}`);
}

// Execute the hostel management system
hostelManagementSystem();

console.log("The End");


