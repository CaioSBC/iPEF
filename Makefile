ODIR := obj
IDIR := inc
SDIR := src

SOURCE_FILES := $(shell find $(SDIR) -name '*.cpp')

CC := g++
C_FLAGS := -I$(IDIR)

iPEF : $(SOURCE_FILES)
	$(CC) -o $@ $^ $(C_FLAGS)

.PHONY : clean

clean :
	rm iPEF