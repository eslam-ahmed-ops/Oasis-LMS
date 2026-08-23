def to_arabic_numerals(number: int | str) -> str:
    arabic_numbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
    return ''.join(arabic_numbers[int(digit)] if digit.isdigit() else digit for digit in str(number))
