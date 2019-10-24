import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

import pytest
from nounExtractor import *

def test_notNoStopWords():
    pass

def test_getEngNouns():
    assert getEngNouns("Hello My Name is ...") == ["Hello", "My", "Name"]

def test_nlp_apis():
    pass

def test_nouns_extractor():
    pass