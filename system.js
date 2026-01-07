let allApplications = [];

        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            window.scrollTo(0, 0);
        }
         AOS.init({ duration: 1000, once: true });

        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            window.scrollTo(0, 0);
            AOS.refresh();
        }
      AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });

        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            const selectedTab = document.getElementById(tabId);
            if(selectedTab) {
                selectedTab.classList.add('active');
                window.scrollTo(0, 0);
                AOS.refresh();
            }
        }

        function handleFormSubmit(event) {
            event.preventDefault();
            const profileFile = document.getElementById('profilePic').files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const newApp = {
                    id: 'ADU-' + Math.floor(Math.random() * 9000 + 1000),
                    name: document.getElementById('fullName').value,
                    email: document.getElementById('studentEmail').value,
                    phone: document.getElementById('studentPhone').value,
                    program: document.getElementById('program').value,
                    parentName: document.getElementById('parentName').value,
                    parentPhone: document.getElementById('parentPhone').value,
                    profileImg: e.target.result,
                    status: 'PENDING',
                    message: 'Codsigaaga waa la helay. Maamulka ayaa dib u eegis ku samaynaya.'
                };
                
                allApplications.push(newApp);
                updateStudentPortal(newApp);
                alert("Codsigaga si guul leh ayaa loo diray!");
                showTab('portal');
            };
            reader.readAsDataURL(profileFile);
        }

        function updateStudentPortal(app) {
            // Student Main
            document.getElementById('portalStudentName').innerText = app.name;
            document.getElementById('portalStudentID').innerText = "ID: " + app.id;
            document.getElementById('portalDept').innerText = app.program;
            document.getElementById('portalImg').src = app.profileImg;
            
            // Personal & Parent Details
            document.getElementById('pEmail').innerText = app.email;
            document.getElementById('pStudentPhone').innerText = app.phone;
            document.getElementById('pName').innerText = app.parentName;
            document.getElementById('pPhone').innerText = app.parentPhone;

            // Status
            const st = document.getElementById('displayStatus');
            st.innerText = app.status;
            st.className = `text-2xl font-black italic uppercase ${app.status === 'ACCEPTED' ? 'text-green-600' : app.status === 'REJECTED' ? 'text-red-600' : 'text-yellow-500'}`;
            document.getElementById('portalMessage').innerText = app.message;
        }

        function handleAdminLogin(event) {
            event.preventDefault();
            if (document.getElementById('adminUser').value === "manager" && document.getElementById('adminPass').value === "1234") {
                document.getElementById('nav-academic').classList.remove('hidden');
                showTab('academic-portal');
                updateAdminDashboard();
            } else { alert("Error: manager / 1234"); }
        }

        function updateAdminDashboard() {
            const tableBody = document.getElementById('academicTableBody');
            tableBody.innerHTML = '';
            document.getElementById('countStudents').innerText = allApplications.length;

            allApplications.forEach((app, index) => {
                tableBody.innerHTML += `
                    <tr class="hover:bg-slate-50">
                        <td class="p-6 flex items-center gap-3">
                            <img src="${app.profileImg}" class="w-10 h-10 rounded-full object-cover">
                            <span class="uppercase font-black">${app.name}</span>
                        </td>
                        <td class="p-6 text-xs text-slate-400 font-bold uppercase">${app.program}</td>
                        <td class="p-6 text-center">
                            <span class="px-3 py-1 rounded-full text-[10px] font-black ${app.status === 'ACCEPTED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}">${app.status}</span>
                        </td>
                        <td class="p-6 text-center space-x-2">
                            <button onclick="approveStudent(${index})" class="bg-[#002147] text-white px-3 py-1 rounded-lg text-[10px] font-black hover:bg-yellow-500 transition">Approve</button>
                        </td>
                    </tr>`;
            });
        }

        function approveStudent(index) {
            allApplications[index].status = 'ACCEPTED';
            allApplications[index].message = "HAYBADDII ADMAS! Waxaa laguu aqbalay jaamacadda si rasmi ah.";
            updateAdminDashboard();
            updateStudentPortal(allApplications[index]);
            alert("Student Approved!");
        }

        function logoutAdmin() {
            document.getElementById('nav-academic').classList.add('hidden');
            showTab('landing');
        }
