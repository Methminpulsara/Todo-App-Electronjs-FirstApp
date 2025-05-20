    // Function to add a task
        function add() {
            const taskInput = document.getElementById('task');
            const taskdInput = document.getElementById('taskd');
            
            const task = taskInput.value.trim();
            const taskd = taskdInput.value.trim();
            
            if (task === '') {
                shakeElement(taskInput);
                return;
            }
            
            addTask(task, taskd);
            
            // Clear inputs
            taskInput.value = '';
            taskdInput.value = '';
            
            // Set focus back to task input
            taskInput.focus();
            
            updateEmptyStates();
        }
        
        // Function to add task to the pending list
        function addTask(task, description) {
            const li = document.getElementById('li');
            
            const row = document.createElement('tr');
            row.className = 'task-item fade-in';
            
            row.innerHTML = `
                <td>
                    <div class="task-title">${task}</div>
                </td>
                <td>
                    <div class="task-description">${description || 'No description'}</div>
                </td>
                <td class="text-center">
                    <input type="checkbox" class="task-checkbox" onclick="completeTask(this, '${task}', '${description || ''}')">
                </td>
            `;
            
            li.appendChild(row);
        }
        
        // Function to complete a task
        function completeTask(checkbox, task, description) {
            if (checkbox.checked) {
                // Get the parent row and remove it
                const row = checkbox.closest('tr');
                row.classList.add('fade-out');
                
                setTimeout(() => {
                    row.remove();
                    addCompletedTask(task, description);
                    updateEmptyStates();
                }, 300);
            }
        }
        
        // Function to add task to completed list
        function addCompletedTask(task, description) {
            const liC = document.getElementById('liC');
            
            const row = document.createElement('tr');
            row.className = 'task-item fade-in';
            
            row.innerHTML = `
                <td>
                    <div class="task-title">${task}</div>
                </td>
                <td>
                    <div class="task-description">${description || 'No description'}</div>
                </td>
            `;
            
            liC.appendChild(row);
        }
        
        // Function to update empty states
        function updateEmptyStates() {
            const pendingTasks = document.getElementById('li').children.length;
            const completedTasks = document.getElementById('liC').children.length;
            
            document.getElementById('emptyPending').style.display = pendingTasks > 0 ? 'none' : 'block';
            document.getElementById('emptyCompleted').style.display = completedTasks > 0 ? 'none' : 'block';
        }
        
        // Function to shake element on error
        function shakeElement(element) {
            element.classList.add('shake');
            element.style.borderColor = '#ef4444';
            
            setTimeout(() => {
                element.classList.remove('shake');
                element.style.borderColor = '';
            }, 500);
        }
        
        // Add shake animation
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-5px); }
                    40%, 80% { transform: translateX(5px); }
                }
                
                .shake {
                    animation: shake 0.5s ease;
                }
                
                .fade-out {
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: all 0.3s ease;
                }
            </style>
        `);
        
        // Initialize empty states
        document.addEventListener('DOMContentLoaded', updateEmptyStates);