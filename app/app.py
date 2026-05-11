from flask import Flask
app = Flask(__name__)
@app.route('/')
def hello(): return '"Cofre do Guilherme: Acesso Restrito!"'
if __name__ == '__main__': app.run()
