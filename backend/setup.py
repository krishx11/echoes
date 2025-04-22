from setuptools import setup, find_packages

setup(
    name='echoes_project',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'F5_TTS',  # Add any other dependencies your project needs
        'sounddevice',
        'numpy',
    ],
)
