"""empty message

Revision ID: e6aad5ffaf63
Revises: 6258a91e5e97
Create Date: 2024-05-29 19:35:23.520335

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e6aad5ffaf63'
down_revision = '6258a91e5e97'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('body', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('date_publication', sa.Date(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_column('date_publication')
        batch_op.drop_column('body')
        batch_op.drop_column('description')

    # ### end Alembic commands ###
