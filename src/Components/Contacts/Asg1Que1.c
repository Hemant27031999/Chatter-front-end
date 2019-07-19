#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

struct node {
   int Roll_No = 101;
   string Name;
   string D.O.B;
   string Address;
   string Phone_No;
	
   struct node *next;
   struct node *prev;
};

struct circular_list {

	struct node *head = NULL;
	struct node *last = NULL;
};

void insert(int roll, string name, string dob, string address, string phoneno)
{
	struct node *index = (struct node*) malloc(sizeof(struct node));
	
	bool elemenr = false;
	while(!elemenr){
		if(index->next!=null || index->Name==""){
			index = index -> next;
		}else{
			elemenr = true;
		}
	}
}	+
