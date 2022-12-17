# import numpy as np
# import pandas as pd
# import os
# import sys


#     column_names = ['user_id', 'item_id', 'rating', 'timestamp']
#     df = pd.read_csv(os.path.join(os.path.dirname(__file__), f".\\V1.0.0\\ML\\divyesh.csv"), sep=',', names=column_names)
#     movie_titles = pd.read_csv(os.path.join(os.path.dirname(__file__), f".\\V1.0.0\\ML\\jassi.csv"))
#     df = pd.merge(df,movie_titles,on='item_id')
#     df.groupby('title')['rating'].mean().sort_values(ascending=False)

#     df.groupby('title')['rating'].count().sort_values(ascending=False)

#     ratings = pd.DataFrame(df.groupby('title')['rating'].mean())

#     ratings['num of ratings'] = pd.DataFrame(df.groupby('title')['rating'].count())

#     moviemat = df.pivot_table(index='user_id',columns='title',values='rating')

#     ratings.sort_values('num of ratings',ascending=False)

#     starwars_user_ratings = moviemat['Star Wars (1977)']
#     liarliar_user_ratings = moviemat['Liar Liar (1997)']

#     similar_to_starwars = moviemat.corrwith(starwars_user_ratings)
#     similar_to_liarliar = moviemat.corrwith(liarliar_user_ratings)

#     corr_starwars = pd.DataFrame(similar_to_starwars,columns=['Correlation'])
#     corr_starwars.dropna(inplace=True)

#     corr_starwars.sort_values('Correlation',ascending=False)

#     corr_starwars = corr_starwars.join(ratings['num of ratings'])

#     corr_starwars[corr_starwars['num of ratings']>100].sort_values('Correlation',ascending=False)

#     corr_liarliar = pd.DataFrame(similar_to_liarliar,columns=['Correlation'])
#     corr_liarliar.dropna(inplace=True)
#     corr_liarliar = corr_liarliar.join(ratings['num of ratings'])
#     corr_liarliar[corr_liarliar['num of ratings']>100].sort_values('Correlation',ascending=False)
#     output = corr_liarliar.head(50)
#     print(output)
#     # print("Hello jasnoor")
#     sys.stdout.flush()
# recommendationEngine()





import numpy as np
import pandas as pd
import sys
import os

def recommendationEngine():
    column_names = ['user_id', 'item_id', 'rating', 'Artist']
    df = pd.read_csv(os.path.join(os.path.dirname(__file__), f".\\V1.0.0\\ML\\jasnoor.csv"), sep=',', names=column_names)
    df.groupby('Artist')['rating'].mean().sort_values(ascending=False).head()
    df.groupby('Artist')['rating'].count().sort_values(ascending=False).head()
    ratings = pd.DataFrame(df.groupby('Artist')['rating'].mean())
    ratings.head()

    ratings['num of ratings'] = pd.DataFrame(df.groupby('Artist')['rating'].count())
    ratings.head()

    moviemat = df.pivot_table(index='user_id',columns='Artist',values='rating')
    moviemat.head()

    ratings.sort_values('num of ratings',ascending=False).head(10)

    ratings.head()

    Aadish_user_ratings = moviemat['Aadish']
    Aakash_user_ratings = moviemat['Aakash']
    Aadish_user_ratings.head()

    similar_to_Aadish = moviemat.corrwith(Aadish_user_ratings)
    similar_to_Aakash = moviemat.corrwith(Aakash_user_ratings)

    corr_Aadish = pd.DataFrame(similar_to_Aadish,columns=['Correlation'])
    corr_Aadish.dropna(inplace=True)
    corr_Aadish.head()

    corr_Aadish.sort_values('Correlation',ascending=False).head(10)

    corr_Aadish = corr_Aadish.join(ratings['num of ratings'])
    corr_Aadish.head()

    corr_Aadish[corr_Aadish['num of ratings']>100].sort_values('Correlation',ascending=False).head()

    corr_Aakash = pd.DataFrame(similar_to_Aakash,columns=['Correlation'])
    corr_Aakash.dropna(inplace=True)
    corr_Aakash = corr_Aakash.join(ratings['num of ratings'])
    corr_Aakash[corr_Aakash['num of ratings']>100].sort_values('Correlation',ascending=False)
    output = corr_Aakash.head(50)
    output = output.to_json()
    print(output)
    # print("Hello jasnoor")
    sys.stdout.flush()
recommendationEngine()