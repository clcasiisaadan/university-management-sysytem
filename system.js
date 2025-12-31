let allApplications = [];
let isAdminLoggedIn = false;
let currentSelectedIndex = null;

function showTab(tabId) {
    if (tabId === 'admin-login' && isAdminLoggedIn) tabId = 'admin-dashboard';
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
}

function handleAdminLogin(event) {
    event.preventDefault();
    if (document.getElementById('adminUser').value === "admin" && document.getElementById('adminPass').value === "1234") {
        isAdminLoggedIn = true;
        showTab('admin-dashboard');
        updateAdminTable();
    } else { alert("Login failed!"); }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const photoFile = document.getElementById('photoInput').files[0];
    const pdfFile = document.getElementById('pdfInput').files[0];

    const newApp = {
        name: document.getElementById('fullName').value,
        program: document.getElementById('program').value,
        photo: photoFile ? URL.createObjectURL(photoFile) : '',
        pdf: pdfFile ? URL.createObjectURL(pdfFile) : '',
        status: 'PENDING',
        message: 'Codsigaaga waa la helay, maamulka ayaa dib u eegis ku sameynaya.'
    };

    allApplications.push(newApp);
    updateStudentPortal(newApp);
    alert("Codsigaaga waa la diray!");
    showTab('portal');
}

function updateStudentPortal(app) {
    document.getElementById('portalStudentName').innerText = app.name;
    const st = document.getElementById('displayStatus');
    st.innerText = app.status;
    st.className = `text-5xl font-black italic uppercase ${app.status === 'ACCEPTED' ? 'text-green-600 animate-bounce' : app.status === 'REJECTED' ? 'text-red-600' : 'text-yellow-500'}`;
    document.getElementById('portalMessage').innerText = app.message;
}

function updateAdminTable() {
    const tableBody = document.getElementById('adminTableBody');
    tableBody.innerHTML = '';
    allApplications.forEach((app, index) => {
        tableBody.innerHTML += `
            <tr class="border-b hover:bg-slate-50">
                <td class="p-8 font-black uppercase italic">${app.name}</td>
                <td class="p-8 text-xs font-bold text-slate-400">${app.program}</td>
                <td class="p-8 text-center">
                    <span class="px-4 py-1 rounded-full text-[9px] font-black ${app.status === 'ACCEPTED' ? 'bg-green-100 text-green-600' : app.status === 'REJECTED' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}">${app.status}</span>
                </td>
                <td class="p-8 text-center">
                    <button onclick="openReviewModal(${index})" class="bg-[#002147] text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase">Review</button>
                </td>
            </tr>`;
    });
}

function openReviewModal(index) {
    currentSelectedIndex = index;
    const app = allApplications[index];
    document.getElementById('reviewContent').innerHTML = `
        <img src="${app.photo}" class="w-32 h-32 rounded-3xl mx-auto mb-6 object-cover border-4 border-slate-100">
        <h3 class="text-3xl font-black text-blue-900 uppercase italic">${app.name}</h3>
        <p class="font-bold text-slate-400 text-sm mb-6 uppercase">${app.program}</p>
        <a href="${app.pdf}" target="_blank" class="text-red-600 font-black text-xs uppercase underline">View Certificate</a>`;
    document.getElementById('reviewModal').classList.remove('hidden');
}

function finalizeDecision(decision) {
    if (currentSelectedIndex !== null) {
        let app = allApplications[currentSelectedIndex];
        app.status = decision;
        app.message = decision === 'ACCEPTED' ? "HAYBADDII ADMAS! Codsigaaga waa la aqbalay." : "Waan ka xunnahay, codsiga lama aqbalin.";
        updateAdminTable();
        updateStudentPortal(app);
        closeReviewModal();
    }
}

document.getElementById('modalApproveBtn').onclick = () => finalizeDecision('ACCEPTED');
document.getElementById('modalRejectBtn').onclick = () => finalizeDecision('REJECTED');
function closeReviewModal() { document.getElementById('reviewModal').classList.add('hidden'); }
function logoutAdmin() { isAdminLoggedIn = false; showTab('landing'); }