let letters = '';
const transformLetters = (codeLetter) => {
    let replace = '';
    switch (codeLetter.keyCode) {
        case 65:
            replace = 'ф';
            return letters = letters + replace;
        case 66:
            replace = 'и';
            return letters = letters + replace;
        case 67:
            replace = 'с';
            return letters = letters + replace;
        case 68:
            replace = 'в';
            return letters = letters + replace;
        case 69:
            replace = 'у';
            return letters = letters + replace;
        case 70:
            replace = 'а';
            return letters = letters + replace;
        case 71:
            replace = 'п';
            return letters = letters + replace;
        case 72:
            replace = 'р';
            return letters = letters + replace;
        case 73:
            replace = 'ш';
            return letters = letters + replace;
        case 74:
            replace = 'о';
            return letters = letters + replace;
        case 75:
            replace = 'л';
            return letters = letters + replace;
        case 76:
            replace = 'д';
            return letters = letters + replace;
        case 77:
            replace = 'ь';
            return letters = letters + replace;
        case 78:
            replace = 'т';
            return letters = letters + replace;
        case 79:
            replace = 'щ';
            return letters = letters + replace;
        case 80:
            replace = 'з';
            return letters = letters + replace;
        case 81:
            replace = 'й';
            return letters = letters + replace;
        case 82:
            replace = 'к';
            return letters = letters + replace;
        case 83:
            replace = 'і';
            return letters = letters + replace;
        case 84:
            replace = 'е';
            return letters = letters + replace;
        case 222:
            replace = 'є';
            return letters = letters + replace;
        case 85:
            replace = 'г';
            return letters = letters + replace;
        case 86:
            replace = 'м';
            return letters = letters + replace;
        case 87:
            replace = 'ц';
            return letters = letters + replace;
        case 88:
            replace = 'ч';
            return letters = letters + replace;
        case 89:
            replace = 'н';
            return letters = letters + replace;
        case 90:
            replace = 'я';
            return letters = letters + replace;
        case 190:
            replace = 'ю';
            return letters = letters + replace;
        case 76:
            replace = 'д';
            return letters = letters + replace;
        case 219:
            replace = 'х';
            return letters = letters + replace;
        case 186:
            replace = 'ж';
            return letters = letters + replace;
        case 188:
            replace = 'б';
            return letters = letters + replace;
        case 16:
            replace = "'";
            return letters = letters + replace;
        case 8:
            return letters = letters.substring(0, letters.length - 1);
        case 32:
            replace = " ";
            return letters = letters + replace;
        case 221:
            replace = "ї";
            return letters = letters + replace;
        default:
            return letters = '';
    }
}
export default transformLetters;