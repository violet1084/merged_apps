
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnApp1').addEventListener('click', function() {
        showApplication('app1');
    });
    document.getElementById('btnApp2').addEventListener('click', function() {
        showApplication('app2');
    });
});

function showApplication(appId) {
    document.getElementById('app1').style.display = 'none';
    document.getElementById('app2').style.display = 'none';
    document.getElementById(appId).style.display = 'block';
    document.getElementById('splashScreen').style.display = 'none'; // Hide splash
}

function hideApplication(appId) {
    document.getElementById(appId).style.display = 'none';
    console.log('Hiding ' + appId);
    document.getElementById('splashScreen').style.display = 'block'; // Show splash again
}

// Ensure that additional JavaScript functions required for application functionality are correctly defined
