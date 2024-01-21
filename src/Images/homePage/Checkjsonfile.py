# -*- coding: utf-8 -*-
"""
Created on Sun Jan  7 10:08:53 2024

@author: HOMA
"""

import json  
import os 

###you must set root_src and  number_of_context
root_src = r"D:\ariis\nlp\PCMM_dataset\lina\lina-ch6-14021017\l13.2.json"
number_of_context = 2
###
c_f = 0
c_t = 0

with open(root_src  , 'r') as file:
    data_elem = json.load(file)
    if number_of_context == len(data_elem['data'][0]['paragraphs']):
                                
        for i in range(len(data_elem['data'][0]['paragraphs'])):
            data_elem['data'][0]['paragraphs'][i]['qas']
            for j in  range(len(data_elem['data'][0]['paragraphs'][i]['qas'])):
                is_impossible = data_elem['data'][0]['paragraphs'][i]['qas'][j]['is_impossible'] 
                if is_impossible == False:
                    c_f += 1
                    answer_start = data_elem['data'][0]['paragraphs'][i]['qas'][j]['answers'][0]['answer_start']
                elif is_impossible == True:
                    c_t += 1
                    context = data_elem['data'][0]['paragraphs'][i]['context']
                    question = data_elem['data'][0]['paragraphs'][i]['qas'][j]['question']
                    answer = data_elem['data'][0]['paragraphs'][i]['qas'][j]['plausible_answers'][0]['text']
                    #print("contextttttttt:", context)
                    #print("questionnnnnn:", question)
                    #print("answerrrrrrr:", answer)
    else:
        ("warninggggg!!! the number of context is't equal to len of paragraphs")
        
print("the number of is_impossible set to False:", c_f)
print("the number of is_impossible set to True:", c_t)




