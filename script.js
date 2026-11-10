
// Get HTML elements
const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const studentProgram = document.getElementById("studentProgram");
const studentTable = document.getElementById("studentTable");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const message = document.getElementById("message");

// Load saved students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Track student being edited
let editIndex = -1;

// Display student records
function displayStudents() {
    studentTable.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        const programCell = document.createElement("td");
        programCell.textContent = student.program;

        const actionCell = document.createElement("td");

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.type = "button";
        editBtn.addEventListener("click", () => editStudent(index));

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";
        deleteBtn.addEventListener("click", () => deleteStudent(index));

        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(programCell);
        row.appendChild(actionCell);

        studentTable.appendChild(row);
    });

    // Save records
    localStorage.setItem("students", JSON.stringify(students));
}

// Add or Update Student
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = studentName.value.trim();
    const email = studentEmail.value.trim();
    const program = studentProgram.value;

    if (name === "" || email === "" || program === "") {
        message.textContent = "Please complete all fields.";
        return;
    }

    const student = {
        name: name,
        email: email,
        program: program
    };

    if (editIndex === -1) {
        // Add new student
        students.push(student);
        message.textContent = "Student added successfully!";
    } else {
        // Update existing student
        students[editIndex] = student;
        message.textContent = "Student updated successfully!";
    }

    // Save and refresh table
    displayStudents();

    // Reset form
    studentForm.reset();
    editIndex = -1;
    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;
});

// Edit Student
function editStudent(index) {
    const student = students[index];

    studentName.value = student.name;
    studentEmail.value = student.email;
    studentProgram.value = student.program;

    editIndex = index;

    submitBtn.textContent = "Update Student";
    cancelBtn.hidden = false;

    message.textContent = "Editing student record.";
}

// Delete Student
function deleteStudent(index) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (confirmDelete) {
        students.splice(index, 1);

        displayStudents();

        // Reset form if deleted student was being edited
        if (editIndex === index) {
            studentForm.reset();
            editIndex = -1;
            submitBtn.textContent = "Add Student";
            cancelBtn.hidden = true;
        }

        message.textContent = "Student deleted successfully!";
    }
}

// Cancel Editing
cancelBtn.addEventListener("click", function() {
    studentForm.reset();

    editIndex = -1;

    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;

    message.textContent = "Editing cancelled.";
});

// Display saved records when page loads
displayStudents();
