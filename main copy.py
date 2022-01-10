import pandas as pd

df = pd.read_csv('GSPC.csv')
#print(df.head())

df = df.drop('Date', axis = 1) # Deleta a coluna de data "date"

#print(df.head()) # Sem o campo data
df[-2::]
#print(df[-2::]) # retonr as últimas 2 linhas

amanha = df[-1::]
amanha

base = df.drop(df[-1::].index, axis = 0)
base.tail()

base['target'] = base['Close'][1:len(base)].reset_index(drop=True) # Cria uma nova coluna, com o conteúdo da coluna CLOSE, começando do índice 1, não 0 [1:]
base.tail()

prev = base[-1::].drop('target', axis = 1)

treino = base.drop(base[-1::].index, axis=0) # exclui última linha(-1)
treino.tail()

treino.loc[treino['target'] > treino['Close'], 'target'] = 1 # se target > close na coluna, então a coluna target vira 1
treino.tail()

treino.loc[treino['target'] != 1, 'target'] = 0 # se o valor for diferente de 1 então vira 0
treino.tail()

y = treino['target']
x = treino.drop('target', axis=1)

from sklearn.model_selection import train_test_split

x_treino, x_teste, y_treino, y_teste = train_test_split(x, y, test_size = 0.3)

from sklearn.ensemble import ExtraTreesClassifier
modelo = ExtraTreesClassifier()
modelo.fit(x_treino, y_treino)

resultado = modelo.score(x_teste, y_teste)
print("Acurácia:", resultado)

print(modelo.predict(prev))