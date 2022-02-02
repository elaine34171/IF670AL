const calculateBtn = document.getElementById('calc-btn');
const resetBtn = document.getElementById('reset-btn');

const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');

const bmiOutput = document.getElementById('bmi-output');
const categoryOutput = document.getElementById('category-output');

const calculateBMI = () => {
    const enteredHeight = +heightInput.value / 100;
    const enteredWeight = +weightInput.value;

    var category = -1;

    const bmi = enteredWeight / (enteredHeight * enteredHeight);

    console.log(bmi);

    if(bmi < 8.5){
        category = "Kurus";
    }
    else{
        if(bmi <= 24.9){
            category = "Normal";
        }
        else{
            if(bmi <= 29.9){
                category = "Gemuk";
            }
            else{
                if(bmi > 29.9){
                    category = "Obesitas";
                }
            }
        }
    }

    if(category != -1){
        bmiOutput.innerHTML = bmi;
        categoryOutput.innerHTML = category;
    }
    else{
        bmiOutput.innerHTML = "Input tidak valid";
        categoryOutput.innerHTML = "Harap isi dengan benar";
    }
};

const resetCalculator = () => {
    heightInput.value = "";
    weightInput.value = "";

    bmiOutput.innerHTML = "";
    categoryOutput.innerHTML = "Hasil";
};

calculateBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', resetCalculator);