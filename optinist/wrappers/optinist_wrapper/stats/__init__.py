from .correlation import correlation
from .granger import Granger
from .pca import PCA
from .tsne import TSNE
from .cca import CCA


stats_wrapper_dict = {
    'correlation': {
        'function': correlation
    },
    'granger': {
        'function': Granger
    },
    'pca': {
        'function': PCA
    },
    'tsne': {
        'function':  TSNE
    },
    'cca': {
        'function':  CCA
    }
}