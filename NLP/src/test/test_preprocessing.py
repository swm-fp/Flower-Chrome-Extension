import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

import pytest
from preprocessing import *

def test_clean_sentence():
    assert clean_sentence(" [-=+,#/?:^$.@*\"※  ~&%·ㆍ!』♥☆‘ |()[]<>`\'…》] ") == ""

def test_filterout():
    assert filterout(['a', 'b', '1', '100']) == []