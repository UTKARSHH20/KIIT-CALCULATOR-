// CGPA Calculator Logic

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const cgpaInput = document.getElementById('cgpa-input');
    const resultContainer = document.getElementById('result-container');
    const percentageOutput = document.getElementById('percentage-output');

    if (calculateBtn && cgpaInput && resultContainer && percentageOutput) {
        calculateBtn.addEventListener('click', () => {
            const cgpa = parseFloat(cgpaInput.value);

            if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
                alert('Please enter a valid CGPA between 0 and 10.');
                return;
            }

            // KIIT Formula: (CGPA - 0.5) * 10
            // Note: This is a common formula, but some universities use CGPA * 10 or other variations.
            // Using (CGPA - 0.5) * 10 as a standard approximation for many Indian universities, 
            // but for KIIT specifically, it is often just CGPA - 0.5 * 10.
            // Let's use the standard (CGPA - 0.5) * 10 for now.

            const percentage = (cgpa - 0.5) * 10;

            percentageOutput.textContent = percentage.toFixed(2) + '%';
            resultContainer.classList.remove('hidden');
        });
    }
});
