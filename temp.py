import tkinter as tk
from tkinter import ttk, messagebox

def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def celsius_to_kelvin(celsius):
    return celsius + 273.15

def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

def fahrenheit_to_kelvin(fahrenheit):
    return fahrenheit_to_celsius(fahrenheit) + 273.15

def kelvin_to_celsius(kelvin):
    return kelvin - 273.15

def kelvin_to_fahrenheit(kelvin):
    return celsius_to_fahrenheit(kelvin_to_celsius(kelvin))

def convert_temperature():
    try:
        value = float(entry_value.get())
        unit = combo_unit.get()

        if unit == 'Celsius':
            fahrenheit = celsius_to_fahrenheit(value)
            kelvin = celsius_to_kelvin(value)
            result.set(f"{value:.2f}°C = {fahrenheit:.2f}°F = {kelvin:.2f}K")
        elif unit == 'Fahrenheit':
            celsius = fahrenheit_to_celsius(value)
            kelvin = fahrenheit_to_kelvin(value)
            result.set(f"{value:.2f}°F = {celsius:.2f}°C = {kelvin:.2f}K")
        elif unit == 'Kelvin':
            celsius = kelvin_to_celsius(value)
            fahrenheit = kelvin_to_fahrenheit(value)
            result.set(f"{value:.2f}K = {celsius:.2f}°C = {fahrenheit:.2f}°F")
        else:
            raise ValueError("Unknown unit of measurement")
    except ValueError as e:
        messagebox.showerror("Invalid input", str(e))

# Create the main window
root = tk.Tk()
root.title("Temperature Converter")

# Create and place the input widgets
frame = ttk.Frame(root, padding="10")
frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

label_value = ttk.Label(frame, text="Enter the temperature value:")
label_value.grid(row=0, column=0, padx=5, pady=5, sticky=tk.W)

entry_value = ttk.Entry(frame, width=20)
entry_value.grid(row=0, column=1, padx=5, pady=5)

label_unit = ttk.Label(frame, text="Select the unit of measurement:")
label_unit.grid(row=1, column=0, padx=5, pady=5, sticky=tk.W)

combo_unit = ttk.Combobox(frame, values=["Celsius", "Fahrenheit", "Kelvin"])
combo_unit.grid(row=1, column=1, padx=5, pady=5)
combo_unit.set("Celsius")

# Create and place the convert button
button_convert = ttk.Button(frame, text="Convert", command=convert_temperature)
button_convert.grid(row=2, column=0, columnspan=2, padx=5, pady=5)

# Create and place the result label
result = tk.StringVar()
label_result = ttk.Label(frame, textvariable=result, font=("Arial", 12))
label_result.grid(row=3, column=0, columnspan=2, padx=5, pady=10)


root.mainloop()
