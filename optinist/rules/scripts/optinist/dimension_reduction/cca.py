import sys
sys.path.append('../optinist')

if __name__ == '__main__':
    from rules.utils import run_script
    __func_config = snakemake.config["rules"]["cca"]
    run_script(__func_config)