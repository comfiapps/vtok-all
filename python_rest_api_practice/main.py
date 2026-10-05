import json
from flask import Flask, request, jsonify
from threading import Thread
import random
import multiprocessing
import consume

NUM_PROC = 2


def append_to_list(lst, num_items):
    for n in random.sample(range(20000000), num_items):
        lst.append(n)
    pass


def threadTest():
    # Thread(target=consume.getTimer()).start()
    # Thread(target=consume.getTimer()).start()
    pass


def apiTest():
    print(consume.mintingInProgressTest())


def main():
    jobs = []

    for i in range(NUM_PROC):
        process = multiprocessing.Process(
            target=append_to_list,
            args=([], 10000000)
        )
        jobs.append(process)

    for j in jobs:
        j.start()

    for j in jobs:
        j.join()


if __name__ == '__main__':
    apiTest()
